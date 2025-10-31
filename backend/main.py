from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List, Dict, Any
import asyncio
import json
from datetime import datetime
import uvicorn
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from dashboard_content import dashboard_html
from hedera_service import hedera_service, batch_processor
from guardian_service import guardian_service
from database_models import (
    ParticipantRegistrationRequest, 
    ParticipantRegistrationResponse,
    ParticipantStatusResponse,
    DATABASE_SCHEMA
)
import uuid

# Mock data functionality
import random
import threading
import time

# Load environment variables
load_dotenv()

app = FastAPI(title="ESP32 Carbon Credit Backend", version="0.6")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Debug middleware to log all requests
@app.middleware("http")
async def log_requests(request, call_next):
    start_time = datetime.now()
    
    # Log incoming request
    print(f"🌐 [{start_time.strftime('%H:%M:%S')}] {request.method} {request.url}")
    print(f"🌐 [{start_time.strftime('%H:%M:%S')}] Headers: {dict(request.headers)}")
    print(f"🌐 [{start_time.strftime('%H:%M:%S')}] Client: {request.client}")
    
    # Process request
    response = await call_next(request)
    
    # Log response
    process_time = (datetime.now() - start_time).total_seconds()
    print(f"🌐 [{start_time.strftime('%H:%M:%S')}] Response: {response.status_code} (took {process_time:.3f}s)")
    
    return response

# Mount static files directory
assets_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets")
app.mount("/static", StaticFiles(directory=assets_path), name="static")

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "your_supabase_url")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "your_supabase_anon_key")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(f"✅ Connected to Supabase: {SUPABASE_URL}")
    
    # Initialize database schema
    try:
        supabase.rpc('exec_sql', {'sql': DATABASE_SCHEMA}).execute()
        print("✅ Database schema initialized")
    except Exception as schema_error:
        print(f"⚠️ Database schema initialization warning: {schema_error}")
        
except Exception as e:
    print(f"❌ Supabase connection error: {e}")
    supabase = None

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections[:]:  # Create a copy to avoid modification during iteration
            try:
                await connection.send_text(message)
            except:
                # Remove dead connections
                self.active_connections.remove(connection)

manager = ConnectionManager()

# Store latest readings in memory
latest_readings = {}
readings_history = []
device_last_seen = {}

@app.get("/", response_class=HTMLResponse)
async def get_dashboard():
    """Serve the real-time dashboard"""
    return HTMLResponse(content=dashboard_html, status_code=200)

@app.get("/debug", response_class=HTMLResponse)
async def get_debug_dashboard():
    """Serve the debug dashboard"""
    with open("debug_dashboard.html", "r") as f:
        debug_html = f.read()
    return HTMLResponse(content=debug_html, status_code=200)

@app.get("/api/test-connection")
async def test_connection():
    """Simple endpoint to test if ESP32 can reach the server"""
    current_time = datetime.now().strftime("%H:%M:%S")
    print(f"🧪 [{current_time}] TEST CONNECTION endpoint hit!")
    return {
        "status": "success",
        "message": "Server is reachable",
        "timestamp": datetime.now().isoformat(),
        "server_ip": "192.168.100.200",
        "port": 5000
    }

@app.post("/api/test-post")
async def test_post(data: Dict[str, Any]):
    """Simple POST endpoint to test if ESP32 can send data"""
    current_time = datetime.now().strftime("%H:%M:%S")
    print(f"🧪 [{current_time}] TEST POST endpoint hit!")
    print(f"🧪 [{current_time}] Received data: {data}")
    return {
        "status": "success",
        "message": "POST request received successfully",
        "received_data": data,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/energy-data")
async def receive_energy_data(reading: Dict[str, Any]):
    """Receive energy data from ESP32 and process through Guardian Tools"""
    current_time = datetime.now().strftime("%H:%M:%S")
    
    # Debug: Log all incoming requests
    print(f"🔍 [{current_time}] ESP32 DATA ENDPOINT HIT!")
    print(f"🔍 [{current_time}] Raw data received: {reading}")
    print(f"🔍 [{current_time}] Data type: {type(reading)}")
    print(f"🔍 [{current_time}] Data keys: {list(reading.keys()) if isinstance(reading, dict) else 'Not a dict'}")
    
    try:
        # Validate required fields
        required_fields = ["device_id", "current", "voltage", "power"]
        missing_fields = []
        
        for field in required_fields:
            if field not in reading:
                missing_fields.append(field)
        
        if missing_fields:
            error_msg = f"Missing required fields: {missing_fields}"
            print(f"❌ [{current_time}] VALIDATION ERROR: {error_msg}")
            print(f"❌ [{current_time}] Available fields: {list(reading.keys())}")
            raise HTTPException(status_code=400, detail=error_msg)
        
        print(f"✅ [{current_time}] Validation passed for device: {reading['device_id']}")
        
        # Fix timestamp - use server time instead of ESP32's fake timestamp
        server_time = datetime.now()
        reading["timestamp"] = server_time.isoformat()
        reading["server_received_at"] = server_time.isoformat()
        
        # Store in memory
        latest_readings[reading["device_id"]] = reading
        readings_history.append(reading)
        device_last_seen[reading["device_id"]] = server_time
        
        print(f"💾 [{current_time}] Stored in memory: {reading['device_id']}")
        
        # Keep only last 1000 readings in memory
        if len(readings_history) > 1000:
            readings_history.pop(0)
        
        # Add to Hedera batch for proof anchoring
        try:
            batch_processor.add_reading(reading)
            if batch_processor.should_process_batch():
                print(f"🔗 [{current_time}] Processing batch for Hedera submission")
                hedera_result = await batch_processor.process_current_batch()
                if hedera_result and hedera_result.success:
                    print(f"✅ [{current_time}] Batch submitted to Hedera: {hedera_result.transaction_id}")
                    
                    # Store proof anchor in database
                    if supabase and hasattr(hedera_result, 'batch'):
                        try:
                            batch = hedera_result.batch
                            proof_data = {
                                "batch_id": batch.batch_id,
                                "hcs_transaction_id": hedera_result.transaction_id,
                                "consensus_timestamp": hedera_result.consensus_timestamp,
                                "data_hash": batch.data_hash,
                                "batch_metadata": {
                                    "device_count": len(set(r.get("device_id") for r in batch.readings)),
                                    "reading_count": len(batch.readings),
                                    "total_energy_kwh": sum(r.get("total_energy_kwh", 0) for r in batch.readings)
                                }
                            }
                            
                            supabase.table("proof_anchors").insert(proof_data).execute()
                            
                            # Store batch contents
                            batch_contents = []
                            for i, reading in enumerate(batch.readings):
                                batch_contents.append({
                                    "batch_id": batch.batch_id,
                                    "device_id": reading.get("device_id"),
                                    "reading_data": reading,
                                    "original_timestamp": reading.get("timestamp"),
                                    "batch_position": i
                                })
                            
                            if batch_contents:
                                supabase.table("batch_contents").insert(batch_contents).execute()
                            
                            print(f"💾 [{current_time}] Proof anchor stored in database")
                            
                        except Exception as db_error:
                            print(f"❌ [{current_time}] Database storage error: {db_error}")
                    
                else:
                    print(f"❌ [{current_time}] Hedera submission failed: {hedera_result.error if hedera_result else 'Unknown error'}")
        except Exception as e:
            print(f"❌ [{current_time}] Error in Hedera batching: {e}")
        
        # Store in Supabase with corrected timestamp
        if supabase:
            try:
                # Create a copy for database with proper timestamp
                db_reading = reading.copy()
                db_reading["timestamp"] = server_time.isoformat()
                db_reading.pop("server_received_at", None)
                
                result = supabase.table("energy_readings").insert(db_reading).execute()
                print(f"💾 [{current_time}] Stored in Supabase: {reading['device_id']} - {reading['power']}W")
            except Exception as e:
                print(f"❌ [{current_time}] Supabase insert error: {e}")
        
        # Broadcast to WebSocket clients
        try:
            await manager.broadcast(json.dumps({
                "type": "energy_reading",
                "data": reading
            }))
            print(f"📡 [{current_time}] Broadcasted to WebSocket clients")
        except Exception as e:
            print(f"❌ [{current_time}] WebSocket broadcast error: {e}")
        
        print(f"✅ [{current_time}] SUCCESS: Received data from {reading['device_id']}: {reading['power']}W")
        
        return {
            "status": "success", 
            "message": "Data received and stored successfully", 
            "server_time": server_time.isoformat(),
            "device_id": reading["device_id"],
            "power": reading["power"]
        }
    
    except HTTPException:
        # Re-raise HTTP exceptions (like validation errors)
        raise
    except Exception as e:
        error_msg = f"Unexpected error processing ESP32 data: {str(e)}"
        print(f"❌ [{current_time}] CRITICAL ERROR: {error_msg}")
        print(f"❌ [{current_time}] Exception type: {type(e)}")
        import traceback
        print(f"❌ [{current_time}] Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    # Check which devices are online (received data in last 30 seconds)
    now = datetime.now()
    online_devices = []
    offline_devices = []
    
    for device_id, last_seen in device_last_seen.items():
        time_diff = (now - last_seen).total_seconds()
        if time_diff <= 30:  # 30 seconds timeout
            online_devices.append(device_id)
        else:
            offline_devices.append(device_id)
    
    return {
        "status": "healthy",
        "timestamp": now.isoformat(),
        "total_devices": len(device_last_seen),
        "online_devices": online_devices,
        "offline_devices": offline_devices,
        "supabase_connected": supabase is not None
    }

@app.get("/api/latest-readings")
async def get_latest_readings():
    """Get latest readings from all devices"""
    return latest_readings

@app.get("/api/readings-history")
async def get_readings_history(limit: int = 100):
    """Get historical readings"""
    return readings_history[-limit:]

@app.get("/api/supabase-data/{device_id}")
async def get_supabase_data(device_id: str, limit: int = 10):
    """Get data from Supabase for a specific device"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not connected")
    
    try:
        result = supabase.table("energy_readings").select("*").eq("device_id", device_id).order("timestamp", desc=True).limit(limit).execute()
        return {
            "device_id": device_id,
            "count": len(result.data),
            "data": result.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supabase query error: {str(e)}")

@app.get("/api/supabase-stats")
async def get_supabase_stats():
    """Get statistics from Supabase"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not connected")
    
    try:
        # Get total count
        result = supabase.table("energy_readings").select("*", count="exact").execute()
        total_count = result.count
        
        # Get unique devices
        devices_result = supabase.table("energy_readings").select("device_id").execute()
        unique_devices = list(set([row["device_id"] for row in devices_result.data]))
        
        # Get latest readings per device
        latest_per_device = {}
        for device in unique_devices:
            latest = supabase.table("energy_readings").select("*").eq("device_id", device).order("timestamp", desc=True).limit(1).execute()
            if latest.data:
                latest_per_device[device] = latest.data[0]
        
        return {
            "total_readings": total_count,
            "unique_devices": len(unique_devices),
            "devices": unique_devices,
            "latest_per_device": latest_per_device
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supabase stats error: {str(e)}")

# Mock data control
mock_data_active = False
mock_data_thread = None

import random
from datetime import datetime, timedelta

# Simulate accumulated energy for the session (global variable)
total_energy_wh = 0
last_mock_time = datetime.now()

def generate_mock_data():
    """Generate realistic mock ESP32 data and accumulate energy as power sum over time"""
    global total_energy_wh, last_mock_time

    current_time = datetime.now()
    delta_time_h = max(1, (current_time - last_mock_time).seconds / 3600)  # Assume 1 hour if first run

    current_hour = current_time.hour
    # Simulate irradiance curve (daylight hours)
    if 6 <= current_hour <= 18:
        base_irradiance = 800 * (1 - abs(current_hour - 12) / 6)
    else:
        base_irradiance = 0

    irradiance = max(0, base_irradiance + random.uniform(-100, 100))
    efficiency = round(0.85 + random.uniform(-0.05, 0.05), 3)
    # Solar panel DC output (just for realism)
    solar_power_dc = irradiance * 0.6 * efficiency + random.uniform(-50, 50)
    solar_power_dc = max(0, solar_power_dc)

    voltage = 220 + random.uniform(-10, 10)
    power_factor = round(0.95 + random.uniform(-0.05, 0.05), 3)
    current = solar_power_dc / (voltage * power_factor) if voltage > 0 and power_factor > 0 else 0

    # True AC power (for IoT grid monitoring)
    power = voltage * current * power_factor
    power = max(0, power)

    # Accumulate total energy in kWh based on simulated hourly interval
    total_energy_wh += power * delta_time_h
    total_energy_kwh = round(total_energy_wh / 1000, 3)
    last_mock_time = current_time

    return {
        "device_id": "ESP32_MOCK_001",
        "current": round(current, 2),
        "voltage": round(voltage, 1),
        "power": round(power, 1),
        "total_energy_kwh": total_energy_kwh,
        "efficiency": efficiency,
        "ambient_temp_c": round(25 + random.uniform(-5, 10), 1),
        "irradiance_w_m2": round(irradiance, 1),
        "power_factor": power_factor
    }


async def send_mock_data():
    """Send mock data through the normal data processing pipeline"""
    mock_reading = generate_mock_data()
    
    # Process through the same pipeline as real ESP32 data
    server_time = datetime.now()
    mock_reading["timestamp"] = server_time.isoformat()
    mock_reading["server_received_at"] = server_time.isoformat()
    
    # Store in memory
    latest_readings[mock_reading["device_id"]] = mock_reading
    readings_history.append(mock_reading)
    device_last_seen[mock_reading["device_id"]] = server_time
    
    # Keep only last 1000 readings in memory
    if len(readings_history) > 1000:
        readings_history.pop(0)
    
    # Broadcast to WebSocket clients
    await manager.broadcast(json.dumps({
        "type": "energy_reading",
        "data": mock_reading
    }))
    
    current_time = server_time.strftime("%H:%M:%S")
    print(f"🧪 [{current_time}] Mock data sent: {mock_reading['device_id']} - {mock_reading['power']}W")

def mock_data_worker():
    """Background worker for continuous mock data generation"""
    global mock_data_active
    
    while mock_data_active:
        try:
            # Create event loop for async function
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            loop.run_until_complete(send_mock_data())
            loop.close()
            
            # Wait 1 second before next mock data
            time.sleep(1)
        except Exception as e:
            print(f"❌ Mock data worker error: {e}")
            time.sleep(5)

@app.post("/api/test/send-mock-data")
async def send_single_mock_data():
    """Send a single mock data point"""
    try:
        await send_mock_data()
        return {
            "status": "success",
            "message": "Mock data sent successfully",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/test/start-mock-stream")
async def start_mock_stream():
    """Start continuous mock data stream"""
    global mock_data_active, mock_data_thread
    
    if mock_data_active:
        return {
            "status": "already_running",
            "message": "Mock data stream is already active"
        }
    
    mock_data_active = True
    mock_data_thread = threading.Thread(target=mock_data_worker, daemon=True)
    mock_data_thread.start()
    
    print("🧪 Mock data stream started")
    return {
        "status": "success",
        "message": "Mock data stream started",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/test/stop-mock-stream")
async def stop_mock_stream():
    """Stop continuous mock data stream"""
    global mock_data_active
    
    if not mock_data_active:
        return {
            "status": "not_running",
            "message": "Mock data stream is not active"
        }
    
    mock_data_active = False
    print("🧪 Mock data stream stopped")
    return {
        "status": "success",
        "message": "Mock data stream stopped",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/test/mock-status")
async def get_mock_status():
    """Get mock data stream status"""
    return {
        "mock_active": mock_data_active,
        "timestamp": datetime.now().isoformat()
    }

# Guardian and Hedera Integration Endpoints

@app.post("/api/participants/register", response_model=ParticipantRegistrationResponse)
async def register_participant(request: ParticipantRegistrationRequest):
    """Register a new project participant and create Guardian DID"""
    current_time = datetime.now().strftime("%H:%M:%S")
    print(f"👤 [{current_time}] Registering participant: {request.participant_name}")
    
    try:
        participant_id = str(uuid.uuid4())
        
        # First, store participant in database
        if supabase:
            try:
                participant_data = {
                    "id": participant_id,
                    "participant_name": request.participant_name,
                    "contact_email": request.email,
                    "profile_completion_status": "pending",
                    "guardian_email_sent": False
                }
                
                supabase.table("guardian_participants").insert(participant_data).execute()
                print(f"💾 [{current_time}] Participant stored in database")
                
            except Exception as db_error:
                print(f"❌ [{current_time}] Database error: {db_error}")
                raise HTTPException(status_code=500, detail="Database error")
        
        # Initialize Guardian if not already done
        if not guardian_service.access_token:
            # Use environment variables for Guardian credentials
            guardian_email = os.getenv("GUARDIAN_EMAIL")
            guardian_password = os.getenv("GUARDIAN_PASSWORD")
            
            if guardian_email and guardian_password:
                login_success = await guardian_service.login(guardian_email, guardian_password)
                if login_success:
                    await guardian_service.initialize_dry_run()
                else:
                    print(f"⚠️ [{current_time}] Guardian login failed, will retry later")
        
        # Create Guardian DID
        guardian_response = None
        if guardian_service.access_token:
            try:
                guardian_response = await guardian_service.create_participant_did(
                    request.participant_name, 
                    request.email
                )
                
                if guardian_response.success:
                    # Update database with DID
                    if supabase:
                        supabase.table("guardian_participants").update({
                            "participant_did": guardian_response.did,
                            "guardian_email_sent": True,
                            "updated_at": datetime.now().isoformat()
                        }).eq("id", participant_id).execute()
                    
                    print(f"✅ [{current_time}] Guardian DID created: {guardian_response.did}")
                    
                    return ParticipantRegistrationResponse(
                        success=True,
                        participant_id=participant_id,
                        did=guardian_response.did,
                        message=f"Participant registered successfully. Guardian will send email to complete profile.",
                        guardian_email_sent=True
                    )
                else:
                    print(f"❌ [{current_time}] Guardian DID creation failed: {guardian_response.error}")
                    
            except Exception as guardian_error:
                print(f"❌ [{current_time}] Guardian error: {guardian_error}")
        
        # Return success even if Guardian fails (can retry later)
        return ParticipantRegistrationResponse(
            success=True,
            participant_id=participant_id,
            message=f"Participant registered. Guardian integration will be completed shortly.",
            guardian_email_sent=False
        )
        
    except HTTPException:
        raise
    except Exception as e:
        error_msg = f"Failed to register participant: {str(e)}"
        print(f"❌ [{current_time}] {error_msg}")
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/api/participants/status/{participant_id}", response_model=ParticipantStatusResponse)
async def get_participant_status(participant_id: str):
    """Get participant registration status"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table("guardian_participants").select("*").eq("id", participant_id).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Participant not found")
        
        participant = result.data[0]
        
        return ParticipantStatusResponse(
            participant_id=participant["id"],
            participant_name=participant["participant_name"],
            did=participant.get("participant_did"),
            email=participant.get("contact_email"),
            profile_completion_status=participant["profile_completion_status"],
            guardian_email_sent=participant["guardian_email_sent"],
            created_at=datetime.fromisoformat(participant["created_at"].replace('Z', '+00:00')),
            updated_at=datetime.fromisoformat(participant["updated_at"].replace('Z', '+00:00'))
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving participant status: {str(e)}")

@app.get("/api/participants/list")
async def list_participants():
    """List all registered participants"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table("guardian_participants").select("*").order("created_at", desc=True).execute()
        
        participants = []
        for participant in result.data:
            participants.append({
                "participant_id": participant["id"],
                "participant_name": participant["participant_name"],
                "did": participant.get("participant_did"),
                "email": participant.get("contact_email"),
                "profile_completion_status": participant["profile_completion_status"],
                "guardian_email_sent": participant["guardian_email_sent"],
                "created_at": participant["created_at"]
            })
        
        return {
            "participants": participants,
            "total": len(participants)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing participants: {str(e)}")

@app.get("/api/proofs/{batch_id}")
async def get_proof_by_batch_id(batch_id: str):
    """Get Hedera proof for a specific batch"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Get proof anchor
        proof_result = supabase.table("proof_anchors").select("*").eq("batch_id", batch_id).execute()
        
        if not proof_result.data:
            raise HTTPException(status_code=404, detail="Proof not found")
        
        proof = proof_result.data[0]
        
        # Get batch contents
        contents_result = supabase.table("batch_contents").select("*").eq("batch_id", batch_id).execute()
        
        return {
            "batch_id": proof["batch_id"],
            "hcs_transaction_id": proof["hcs_transaction_id"],
            "consensus_timestamp": proof["consensus_timestamp"],
            "data_hash": proof["data_hash"],
            "batch_metadata": proof["batch_metadata"],
            "created_at": proof["created_at"],
            "reading_count": len(contents_result.data),
            "verification_url": f"https://hashscan.io/testnet/transaction/{proof['hcs_transaction_id']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving proof: {str(e)}")

@app.get("/api/proofs/verify/{transaction_id}")
async def verify_proof_by_transaction_id(transaction_id: str):
    """Verify a proof exists on Hedera by transaction ID"""
    try:
        # Check if proof exists in our database
        if supabase:
            result = supabase.table("proof_anchors").select("*").eq("hcs_transaction_id", transaction_id).execute()
            
            if result.data:
                proof = result.data[0]
                
                # Verify with Hedera service
                is_valid = await hedera_service.verify_proof(proof["data_hash"], transaction_id)
                
                return {
                    "transaction_id": transaction_id,
                    "batch_id": proof["batch_id"],
                    "data_hash": proof["data_hash"],
                    "consensus_timestamp": proof["consensus_timestamp"],
                    "verified": is_valid,
                    "verification_url": f"https://hashscan.io/testnet/transaction/{transaction_id}"
                }
        
        # If not in database, try to verify directly with Hedera
        is_valid = await hedera_service.verify_proof("", transaction_id)
        
        return {
            "transaction_id": transaction_id,
            "verified": is_valid,
            "note": "Transaction exists on Hedera but not in local database",
            "verification_url": f"https://hashscan.io/testnet/transaction/{transaction_id}"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error verifying proof: {str(e)}")

@app.get("/api/proofs/list")
async def list_proofs(limit: int = 50):
    """List recent Hedera proofs"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table("proof_anchors").select("*").order("created_at", desc=True).limit(limit).execute()
        
        proofs = []
        for proof in result.data:
            proofs.append({
                "batch_id": proof["batch_id"],
                "hcs_transaction_id": proof["hcs_transaction_id"],
                "consensus_timestamp": proof["consensus_timestamp"],
                "data_hash": proof["data_hash"],
                "created_at": proof["created_at"],
                "verification_url": f"https://hashscan.io/testnet/transaction/{proof['hcs_transaction_id']}"
            })
        
        return {
            "proofs": proofs,
            "total": len(proofs)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing proofs: {str(e)}")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time data"""
    await manager.connect(websocket)
    try:
        while True:
            # Send latest readings every 5 seconds
            if latest_readings:
                await websocket.send_text(json.dumps({
                    "type": "latest_readings",
                    "data": latest_readings
                }))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Dashboard HTML is imported from dashboard_content.py

if __name__ == "__main__":
    # Railway provides PORT environment variable
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Starting ESP32 Carbon Credit Backend with Supabase on port {port}")
    print(f"📊 Dashboard: http://localhost:{port}")
    print(f"🔌 ESP32 endpoint: http://localhost:{port}/api/energy-data")
    print(f"📋 Supabase stats: http://localhost:{port}/api/supabase-stats")
    # Bind to all interfaces so both localhost and ESP32 can connect
    uvicorn.run(app, host="0.0.0.0", port=port)