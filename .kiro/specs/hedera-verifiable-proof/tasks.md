# Implementation Plan

- [x] 1. Set up Hedera Service infrastructure
- [x] 1.1 Create Node.js Hedera microservice with @hashgraph/sdk

  - Set up basic Express server for HCS operations
  - Implement HCS message submission endpoint
  - Add transaction query endpoint
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.2 Integrate Node.js service with FastAPI backend

  - Add HTTP client for Node.js service communication
  - Implement retry logic and error handling
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Implement data batching and Hedera proof anchoring
- [x] 2.1 Create energy data batching service

  - Implement batch creation with 1000 readings or 1-hour limit
  - Add GZIP compression and SHA-256 hashing
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2.2 Integrate batching with Hedera service

  - Submit batch hashes to HCS via Node.js service
  - Store proof anchors with consensus timestamps
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 3. Implement Guardian Service integration
- [x] 3.1 Create Guardian API client

  - Implement DID creation with participant name
  - Add participant status checking
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 3.2 Build Guardian data submission

  - Format energy batches for Guardian submission
  - Include Hedera proof anchors in submissions
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 4. Create database schema and models
- [x] 4.1 Set up database tables

  - Create proof_anchors, batch_contents, guardian_participants, guardian_submissions tables
  - Add indexes for performance
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 4.2 Implement data models

  - Create Pydantic models for all data structures
  - Add validation and serialization
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Build API endpoints
- [x] 5.1 Create participant registration endpoints

  - POST /api/participants/register (name + email only)
  - GET /api/participants/status/{did}
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 5.2 Add Hedera proof query endpoints

  - GET /api/proofs/{batch_id}
  - GET /api/proofs/verify/{transaction_id}
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 6. Update frontend for simplified participant registration
- [x] 6.1 Create simple participant registration form

  - Replace complex AMS-I.D form with name + email form
  - Add participant status display
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 6.2 Integrate with backend APIs

  - Connect form to participant registration endpoint
  - Display Guardian email notification status
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 7. Implement end-to-end workflow
- [x] 7.1 Connect ESP32 data to Hedera proofs

  - Modify existing energy data endpoint to trigger batching
  - Ensure all ESP32 data gets included in Hedera proofs
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 7.2 Link Hedera proofs to Guardian submissions

  - Automatically submit verified energy data to Guardian
  - Include proof anchors in Guardian submissions
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 8. Add monitoring and error handling
- [x] 8.1 Implement comprehensive error handling

  - Add retry logic for Hedera and Guardian API calls
  - Implement circuit breakers and fallback mechanisms
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 8.2 Add system monitoring
  - Track batch processing rates and success rates
  - Monitor Hedera and Guardian API health
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
