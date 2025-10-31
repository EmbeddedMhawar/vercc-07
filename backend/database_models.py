from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
from datetime import datetime
from enum import Enum

class ProfileCompletionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class SubmissionStatus(str, Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    FAILED = "failed"
    PROCESSING = "processing"

# Pydantic models for API requests/responses
class ParticipantRegistrationRequest(BaseModel):
    participant_name: str = Field(..., min_length=1, max_length=255)
    email: Optional[str] = Field(None, regex=r'^[^@]+@[^@]+\.[^@]+$')

class ParticipantRegistrationResponse(BaseModel):
    success: bool
    participant_id: str
    did: Optional[str] = None
    message: str
    guardian_email_sent: bool = False

class ParticipantStatusResponse(BaseModel):
    participant_id: str
    participant_name: str
    did: Optional[str] = None
    email: Optional[str] = None
    profile_completion_status: ProfileCompletionStatus
    guardian_email_sent: bool
    created_at: datetime
    updated_at: datetime

class ProofAnchorModel(BaseModel):
    id: str
    batch_id: str
    hcs_transaction_id: str
    consensus_timestamp: Optional[datetime] = None
    data_hash: str
    batch_metadata: Dict[str, Any]
    created_at: datetime

class GuardianSubmissionModel(BaseModel):
    id: str
    batch_id: str
    participant_did: str
    energy_data: Dict[str, Any]
    hedera_proof_reference: str
    submission_status: SubmissionStatus
    guardian_response: Optional[Dict[str, Any]] = None
    submitted_at: datetime

class EnergyBatchSummary(BaseModel):
    batch_id: str
    device_count: int
    reading_count: int
    total_energy_kwh: float
    timestamp_range: Dict[str, str]
    hedera_proof: Optional[str] = None

# Database initialization SQL
DATABASE_SCHEMA = """
-- Proof anchors table
CREATE TABLE IF NOT EXISTS proof_anchors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id VARCHAR(255) UNIQUE NOT NULL,
    hcs_transaction_id VARCHAR(255) NOT NULL,
    consensus_timestamp TIMESTAMP,
    data_hash VARCHAR(64) NOT NULL,
    batch_metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Batch contents table  
CREATE TABLE IF NOT EXISTS batch_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id VARCHAR(255) NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    reading_data JSONB NOT NULL,
    original_timestamp TIMESTAMP NOT NULL,
    batch_position INTEGER NOT NULL,
    FOREIGN KEY (batch_id) REFERENCES proof_anchors(batch_id) ON DELETE CASCADE
);

-- Guardian participants table
CREATE TABLE IF NOT EXISTS guardian_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_did VARCHAR(255) UNIQUE,
    participant_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    profile_completion_status VARCHAR(50) DEFAULT 'pending',
    guardian_email_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Guardian submissions table
CREATE TABLE IF NOT EXISTS guardian_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id VARCHAR(255) NOT NULL,
    participant_did VARCHAR(255) NOT NULL,
    energy_data JSONB NOT NULL,
    hedera_proof_reference VARCHAR(255) NOT NULL,
    submission_status VARCHAR(50) DEFAULT 'pending',
    guardian_response JSONB,
    submitted_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (batch_id) REFERENCES proof_anchors(batch_id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_proof_anchors_batch_id ON proof_anchors(batch_id);
CREATE INDEX IF NOT EXISTS idx_proof_anchors_transaction_id ON proof_anchors(hcs_transaction_id);
CREATE INDEX IF NOT EXISTS idx_batch_contents_batch_id ON batch_contents(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_contents_device_id ON batch_contents(device_id);
CREATE INDEX IF NOT EXISTS idx_guardian_participants_did ON guardian_participants(participant_did);
CREATE INDEX IF NOT EXISTS idx_guardian_submissions_batch_id ON guardian_submissions(batch_id);
CREATE INDEX IF NOT EXISTS idx_guardian_submissions_participant_did ON guardian_submissions(participant_did);

-- Update trigger for guardian_participants
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guardian_participants_updated_at 
    BEFORE UPDATE ON guardian_participants 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
"""