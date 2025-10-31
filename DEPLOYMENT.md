# VerifiedCC Deployment Guide

## Quick Start (3 minutes)

### 1. Install Dependencies
```bash
./setup.sh
```

### 2. Configure Environment
Edit these files with your credentials:
- `backend/.env` - Supabase and Guardian credentials
- `hedera-service/.env` - Hedera account and topic ID

### 3. Start Services (3 terminals)

**Terminal 1 - Hedera Service:**
```bash
cd hedera-service
npm start
```

**Terminal 2 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 3 - Frontend:**
```bash
cd frontend-solid
npm run dev
```

### 4. Access Dashboard
Open http://localhost:5000

## Configuration Details

### Hedera Setup
1. Create Hedera testnet account at https://portal.hedera.com
2. Create a topic for consensus messages
3. Add credentials to `hedera-service/.env`:
```
HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_PRIVATE_KEY=YOUR_PRIVATE_KEY
HEDERA_TOPIC_ID=0.0.YOUR_TOPIC_ID
```

### Guardian Setup
1. Register at https://guardianservice.app
2. Add credentials to `backend/.env`:
```
GUARDIAN_EMAIL=your_email@example.com
GUARDIAN_PASSWORD=your_password
```

### Supabase Setup
1. Create project at https://supabase.com
2. Add credentials to `backend/.env`:
```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

## Testing the System

### 1. Run System Test
```bash
python test_system.py
```

### 2. Test Participant Registration
1. Open dashboard at http://localhost:5000
2. Click "Register Participant"
3. Enter name and email
4. Check console logs for Guardian DID creation

### 3. Test Energy Data Flow
1. Use dashboard "Send Mock Data" button
2. Watch console for batch processing
3. Check Hedera proof creation
4. Verify database storage

### 4. Test ESP32 Integration
Send POST to `/api/energy-data`:
```bash
curl -X POST http://localhost:5000/api/energy-data \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "ESP32_001",
    "current": 2.5,
    "voltage": 220.0,
    "power": 550.0,
    "total_energy_kwh": 1.25
  }'
```

## API Endpoints

### Core Endpoints
- `POST /api/participants/register` - Register participant
- `POST /api/energy-data` - Submit ESP32 data
- `GET /api/proofs/list` - List Hedera proofs
- `GET /api/health` - System health

### Verification
- `GET /api/proofs/verify/{transaction_id}` - Verify on Hedera
- `GET /api/participants/status/{id}` - Participant status

## Monitoring

### Health Checks
- Backend: `curl http://localhost:5000/health`
- Hedera: `curl http://localhost:3001/health`
- Frontend: `curl http://localhost:3000` (if running dev server)

### Logs
- Backend: Console output with timestamps
- Hedera: Express server logs
- Database: Supabase dashboard

### Key Metrics
- Batch processing rate
- Hedera submission success rate
- Guardian DID creation rate
- ESP32 device connectivity

## Troubleshooting

### Common Issues

**"Module not found" errors:**
```bash
pip install httpx fastapi uvicorn python-dotenv pydantic supabase websockets
```

**Hedera connection failed:**
- Check account ID and private key
- Verify topic ID exists
- Ensure sufficient HBAR balance

**Guardian login failed:**
- Verify email/password
- Check Guardian service status
- Try manual login at guardianservice.app

**Database errors:**
- Check Supabase URL and key
- Verify project is active
- Check table creation in logs

### Debug Mode
Add to backend/.env:
```
DEBUG=true
LOG_LEVEL=debug
```

## Production Deployment

### Environment Changes
1. Use Hedera mainnet credentials
2. Use production Supabase instance
3. Set production Guardian credentials
4. Configure proper CORS origins

### Infrastructure
- Deploy backend with gunicorn/uvicorn
- Use nginx for frontend static files
- Set up SSL certificates
- Configure monitoring and alerts

### Security
- Use environment variables for secrets
- Enable Supabase RLS policies
- Set up proper CORS configuration
- Use HTTPS for all communications

## Architecture Summary

```
ESP32 → FastAPI → Hedera Service → HCS
                ↓
              Guardian → Carbon Credits
                ↓
            Supabase Database
                ↓
            SolidJS Dashboard
```

## Success Criteria

✅ ESP32 data flows to backend
✅ Data batches and submits to Hedera
✅ Hedera proofs are publicly verifiable
✅ Guardian DIDs are created automatically
✅ Participants receive Guardian emails
✅ Dashboard shows real-time data
✅ API endpoints respond correctly
✅ Database stores all records

## Support

For issues:
1. Check logs in all three services
2. Verify environment configuration
3. Test individual components
4. Check network connectivity
5. Verify service dependencies

The system is designed to be resilient - if one component fails, others continue operating and will retry when the service recovers.