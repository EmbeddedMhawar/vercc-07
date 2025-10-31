import httpx
import asyncio
import json
import hashlib
import gzip
from datetime import datetime
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)

@dataclass
class HederaSubmissionResult:
    success: bool
    transaction_id: Optional[str] = None
    consensus_timestamp: Optional[str] = None
    error: Optional[str] = None
    batch: Optional['EnergyBatch'] = None

@dataclass
class EnergyBatch:
    batch_id: str
    readings: List[Dict[str, Any]]
    created_at: datetime
    compressed_data: bytes
    data_hash: str

class HederaService:
    def __init__(self, hedera_service_url: str = "http://localhost:3001"):
        self.hedera_service_url = hedera_service_url
        self.client = httpx.AsyncClient(timeout=30.0)
        
    async def health_check(self) -> bool:
        """Check if Hedera service is healthy"""
        try:
            response = await self.client.get(f"{self.hedera_service_url}/health")
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Hedera service health check failed: {e}")
            return False
    
    def create_batch_hash(self, readings: List[Dict[str, Any]]) -> tuple[bytes, str]:
        """Create compressed data and hash for a batch of readings"""
        # Convert readings to JSON and compress
        json_data = json.dumps(readings, sort_keys=True).encode('utf-8')
        compressed_data = gzip.compress(json_data)
        
        # Create SHA-256 hash
        data_hash = hashlib.sha256(compressed_data).hexdigest()
        
        return compressed_data, data_hash
    
    async def submit_proof_to_hedera(self, batch: EnergyBatch) -> HederaSubmissionResult:
        """Submit a batch proof to Hedera Consensus Service"""
        try:
            # Prepare message for HCS
            message_data = {
                "batch_id": batch.batch_id,
                "data_hash": batch.data_hash,
                "device_count": len(set(r.get("device_id") for r in batch.readings)),
                "reading_count": len(batch.readings),
                "timestamp_range": {
                    "start": min(r.get("timestamp", "") for r in batch.readings),
                    "end": max(r.get("timestamp", "") for r in batch.readings)
                },
                "created_at": batch.created_at.isoformat()
            }
            
            # Submit to HCS via Node.js service
            response = await self.client.post(
                f"{self.hedera_service_url}/api/hcs/submit-message",
                json={
                    "message": json.dumps(message_data),
                    "metadata": {
                        "batch_id": batch.batch_id,
                        "type": "energy_batch_proof"
                    }
                }
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info(f"✅ Batch {batch.batch_id} submitted to Hedera: {result['transactionId']}")
                return HederaSubmissionResult(
                    success=True,
                    transaction_id=result["transactionId"],
                    consensus_timestamp=result.get("consensusTimestamp")
                )
            else:
                error_msg = f"HCS submission failed: {response.status_code} - {response.text}"
                logger.error(error_msg)
                return HederaSubmissionResult(success=False, error=error_msg)
                
        except Exception as e:
            error_msg = f"Error submitting to Hedera: {str(e)}"
            logger.error(error_msg)
            return HederaSubmissionResult(success=False, error=error_msg)
    
    async def verify_proof(self, data_hash: str, transaction_id: str) -> bool:
        """Verify a proof exists on Hedera (placeholder - would use Mirror Node API)"""
        try:
            response = await self.client.get(
                f"{self.hedera_service_url}/api/hcs/transaction/{transaction_id}"
            )
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Error verifying proof: {e}")
            return False
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

class BatchProcessor:
    def __init__(self, hedera_service: HederaService, max_batch_size: int = 1000, max_batch_age_minutes: int = 60):
        self.hedera_service = hedera_service
        self.max_batch_size = max_batch_size
        self.max_batch_age_minutes = max_batch_age_minutes
        self.current_batch: List[Dict[str, Any]] = []
        self.batch_start_time = datetime.now()
        
    def add_reading(self, reading: Dict[str, Any]) -> None:
        """Add a reading to the current batch"""
        self.current_batch.append(reading)
        
    def should_process_batch(self) -> bool:
        """Check if batch should be processed based on size or age"""
        if len(self.current_batch) >= self.max_batch_size:
            return True
            
        age_minutes = (datetime.now() - self.batch_start_time).total_seconds() / 60
        if age_minutes >= self.max_batch_age_minutes and len(self.current_batch) > 0:
            return True
            
        return False
    
    async def process_current_batch(self) -> Optional[HederaSubmissionResult]:
        """Process the current batch and submit to Hedera"""
        if not self.current_batch:
            return None
            
        try:
            # Create batch
            batch_id = f"batch_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{len(self.current_batch)}"
            compressed_data, data_hash = self.hedera_service.create_batch_hash(self.current_batch)
            
            batch = EnergyBatch(
                batch_id=batch_id,
                readings=self.current_batch.copy(),
                created_at=datetime.now(),
                compressed_data=compressed_data,
                data_hash=data_hash
            )
            
            # Submit to Hedera
            result = await self.hedera_service.submit_proof_to_hedera(batch)
            
            # Add batch to result for database storage
            if result.success:
                result.batch = batch
            
            # Clear current batch
            self.current_batch.clear()
            self.batch_start_time = datetime.now()
            
            return result
            
        except Exception as e:
            logger.error(f"Error processing batch: {e}")
            return HederaSubmissionResult(success=False, error=str(e))

# Global instances
hedera_service = HederaService()
batch_processor = BatchProcessor(hedera_service)