# VerifiedCC - Hedera Verifiable Proof System

**Hackathon Track:** Onchain Finance & RWA  
**Team:** VerifiedCC Team

A complete system for creating tamper-proof energy data records on Hedera Consensus Service with Guardian Service integration for automated carbon credit verification in Africa.

## Hedera Integration Summary

### Hedera Consensus Service (HCS) - Immutable Energy Data Logging

We chose HCS for immutable logging of critical energy consumption events because its predictable $0.0001 fee guarantees operational cost stability, which is essential for low-margin carbon credit operations in Africa. HCS provides tamper-proof, publicly auditable records with consensus timestamps that create an immutable ordering of energy data batches.

**Transaction Types:** TopicMessageSubmitTransaction for energy data batch anchoring  
**Economic Justification:** HCS's low, predictable fees enable cost-effective batch processing of IoT sensor data, making carbon credit verification accessible to small-scale African energy producers.

### Hedera Token Service (HTS) - Carbon Credit Tokenization

HTS enables the creation of fungible carbon credit tokens with built-in compliance features. The predictable fee structure and high throughput support the tokenization of verified carbon credits at scale.

**Transaction Types:** TokenCreateTransaction, TokenMintTransaction, TokenTransferTransaction  
**Economic Justification:** HTS's low transaction costs and ABFT finality ensure immediate settlement of carbon credit trades, crucial for liquidity in emerging African carbon markets.

### Guardian Service Integration - Automated DID Management

Integration with Guardian Service for automated DID creation and carbon credit workflow management, leveraging Hedera's DID method for participant identity verification.

**Transaction Types:** DID creation and management through Guardian Service API  
**Economic Justification:** Automated DID management reduces onboarding costs and ensures compliance with international carbon credit standards.

## Deployment & Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- Hedera Testnet account with HBAR balance

### 1. Clone Repository

```bash
git clone <repository-url>
cd verifiedcc-hedera-proof
```

### 2. Setup Hedera Service (Node.js)

```bash
cd hedera-service
npm install
cp .env.example .env
# Configure .env with your Hedera Testnet credentials:
# HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
# HEDERA_PRIVATE_KEY=YOUR_PRIVATE_KEY
# HEDERA_TOPIC_ID=0.0.YOUR_TOPIC_ID
npm start
```

### 3. Setup Backend (Python)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configure .env with Supabase and Guardian credentials
python main.py
```

### 4. Setup Frontend (SolidJS)

```bash
cd frontend-solid
npm install
npm run dev
```

### Running Environment

- Frontend: `http://localhost:3000` (SolidJS application)
- Backend API: `http://localhost:5000` (FastAPI server)
- Hedera Service: `http://localhost:3001` (Node.js microservice)

## Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   ESP32 IoT     │───▶│   FastAPI        │───▶│   Hedera Service    │
│   Sensors       │    │   Backend        │    │   (Node.js)         │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                │                          │
                                ▼                          ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   SolidJS       │◀───│   Supabase       │    │   Hedera Network    │
│   Frontend      │    │   Database       │    │   (HCS/HTS/DID)     │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                │                          │
                                ▼                          ▼
                       ┌──────────────────┐    ┌─────────────────────┐
                       │   Guardian       │◀───│   Mirror Node       │
                       │   Service        │    │   Explorer          │
                       └──────────────────┘    └─────────────────────┘
```

Data flows from ESP32 sensors → Backend → Hedera Service → Hedera Network, with Guardian Service managing DID creation and carbon credit workflows.

## Deployed Hedera IDs

**Testnet Deployment:**

- HCS Topic ID: `0.0.4915962` (Energy data batch anchoring)
- Account ID: `0.0.4915961` (Main service account)
- Token ID: `0.0.4915963` (Carbon credit tokens - if applicable)

_Note: Test credentials for judges are provided in the DoraHacks submission notes._

## Project Overview

### Problem Statement

Small-scale renewable energy producers in Africa lack access to transparent, verifiable carbon credit markets due to high verification costs and complex certification processes. Traditional carbon credit verification requires expensive third-party auditors and lengthy manual processes, making it economically unfeasible for small producers.

### Solution

VerifiedCC creates an automated, blockchain-based verification system using Hedera's consensus and token services to enable cost-effective carbon credit generation for African energy producers. The system provides:

1. **Automated Data Collection**: ESP32 IoT sensors collect real-time energy production data
2. **Immutable Proof Anchoring**: Hedera Consensus Service creates tamper-proof records
3. **Automated Verification**: Guardian Service integration for DID-based identity and compliance
4. **Tokenized Credits**: HTS-based carbon credit tokens for immediate trading

### Key Features

- Real-time energy data collection and batching
- Immutable proof anchoring on Hedera Consensus Service
- Automated DID creation and participant onboarding
- Public verification through Hedera Mirror Node Explorer
- Cost-effective batch processing optimized for African markets

## Hackathon Submission Links

### Required Submission Components

- **Pitch Deck**: [Link to be added to DoraHacks submission]
- **Demo Video**: [Link to be added to DoraHacks submission]
- **Hedera Certification**: [Team member certification links to be provided]

## Core API Endpoints

### Hedera Integration

- `POST /api/energy-data` - Submit ESP32 energy readings (triggers HCS batch processing)
- `GET /api/proofs/verify/{transaction_id}` - Verify proof on Hedera Mirror Node
- `GET /api/proofs/{batch_id}` - Get Hedera transaction details for batch

### Participant Management

- `POST /api/participants/register` - Register participant (triggers Guardian DID creation)
- `GET /api/participants/status/{id}` - Get Guardian integration status

## Technology Stack & Security

### Core Technologies

- **Backend**: FastAPI (Python) for data processing and API endpoints
- **Frontend**: SolidJS for responsive user interface
- **Blockchain**: Hedera Hashgraph (HCS, HTS, DID integration)
- **Database**: Supabase (PostgreSQL) for application data
- **IoT Integration**: ESP32 sensor support with JSON API

### Security Features

- SHA-256 hashing for energy data batch integrity
- Hedera consensus timestamps for immutable ordering
- Guardian Service DID-based identity verification
- Public proof verification through Hedera Mirror Node
- Comprehensive audit trails from sensor to carbon credit

### ESP32 Data Format

```json
{
  "device_id": "ESP32_001",
  "current": 2.5,
  "voltage": 220.0,
  "power": 550.0,
  "total_energy_kwh": 1.25,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Testing & Verification

### Quick Verification Steps

1. **Start all services**: Run Hedera service, Backend, and Frontend
2. **Register participant**: Use dashboard to create new participant (triggers Guardian DID)
3. **Submit energy data**: Send mock ESP32 data via API or dashboard
4. **Verify on Hedera**: Check transaction hash on Hedera Mirror Node Explorer
5. **Confirm batch processing**: Verify energy data batch appears in HCS topic

### Hedera Transaction Verification

- All energy data batches are anchored to HCS Topic: `0.0.4915962`
- Transaction hashes can be verified at: `https://hashscan.io/testnet/`
- API endpoint `/api/proofs/verify/{transaction_id}` provides direct verification

### Guardian Integration Testing

- Participant registration automatically creates Guardian DID
- Check participant status via `/api/participants/status/{id}`
- Guardian profile completion emails are sent automatically

## Project Status: Prototype (TRL 4-6)

This project demonstrates a working prototype with:

- ✅ Functional Hedera Consensus Service integration
- ✅ Working Guardian Service DID creation
- ✅ End-to-end energy data processing pipeline
- ✅ Public proof verification system
- ✅ SolidJS frontend with real-time updates

## Team & Contact

**GitHub Repository**: [Current Repository]  
**Team Contact**: [To be provided in DoraHacks submission]  
**Hedera Certification**: [Team member certifications to be linked]

---

_This project is submitted for the Hedera Africa Hackathon 2025 - Onchain Finance & RWA Track_
