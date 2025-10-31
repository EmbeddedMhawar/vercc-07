# Slide 11-12: Architecture & TRL Summary

## System Architecture
**ESP32 IoT Sensors** → **FastAPI Backend** → **Node.js Hedera Service** → **HCS Topic 0.0.4915962**
↓
**Guardian Service (DID Management)** + **Supabase Database** + **SolidJS Dashboard**

## Key Hedera Integration Points
- **HCS**: Topic `0.0.4915962` for immutable energy data batch anchoring
- **Account**: `0.0.4915961` with live testnet transactions
- **DID**: `did:hedera:testnet` participant identity via Guardian Service
- **Verification**: Public proof verification via HashScan Mirror Node
- **Cost Optimization**: 70% reduction through batch processing ($0.0001 per 1000 readings)

## TRL Level: **Prototype (TRL 5-6)**

### ✅ Demonstrated Capabilities
- Live HCS transactions with verifiable proofs on testnet
- Automated Guardian DID creation and participant onboarding
- End-to-end data pipeline: ESP32 → Hedera → Guardian
- Real-time dashboard with WebSocket updates
- Public verification system via Mirror Node Explorer

### 🎯 Production Ready Features
- 3-5 second ABFT finality for immediate proof availability
- Comprehensive error handling and retry logic
- Cost-effective batch processing for African market viability
- Complete API documentation and deployment guides