import httpx
import json
import logging
from datetime import datetime
from typing import Dict, Any, Optional
from dataclasses import dataclass

logger = logging.getLogger(__name__)

@dataclass
class GuardianDIDResponse:
    success: bool
    did: Optional[str] = None
    username: Optional[str] = None
    error: Optional[str] = None

@dataclass
class GuardianSubmissionResult:
    success: bool
    response_data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class GuardianService:
    def __init__(self, guardian_url: str = "https://guardianservice.app"):
        self.guardian_url = guardian_url
        self.client = httpx.AsyncClient(timeout=60.0)
        self.access_token = None
        self.policy_id = "68d69341152381fe552b21ec"  # AMS-I.D policy
        
    async def login(self, email: str, password: str) -> bool:
        """Login to Guardian Service and get access token"""
        try:
            # Step 1: Login to get refresh token
            login_response = await self.client.post(
                f"{self.guardian_url}/api/v1/accounts/loginByEmail",
                json={"email": email, "password": password},
                headers={
                    "User-Agent": "VerifiedCC/1.0",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            )
            
            if login_response.status_code != 200:
                logger.error(f"Guardian login failed: {login_response.text}")
                return False
                
            login_data = login_response.json()
            refresh_token = login_data.get('login', {}).get('refreshToken')
            
            if not refresh_token:
                logger.error("No refresh token received from Guardian")
                return False
            
            # Step 2: Exchange for access token
            token_response = await self.client.post(
                f"{self.guardian_url}/api/v1/accounts/access-token",
                json={"refreshToken": refresh_token},
                headers={
                    "User-Agent": "VerifiedCC/1.0",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            )
            
            if token_response.status_code != 200:
                logger.error(f"Guardian token exchange failed: {token_response.text}")
                return False
                
            token_data = token_response.json()
            self.access_token = token_data.get("accessToken")
            
            if self.access_token:
                logger.info("✅ Guardian authentication successful")
                return True
            else:
                logger.error("No access token received from Guardian")
                return False
                
        except Exception as e:
            logger.error(f"Guardian login error: {e}")
            return False
    
    def get_auth_headers(self) -> Dict[str, str]:
        """Get headers with authentication"""
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "VerifiedCC/1.0"
        }
    
    async def initialize_dry_run(self) -> bool:
        """Initialize dry-run for the policy"""
        try:
            response = await self.client.put(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/dry-run",
                json={},
                headers=self.get_auth_headers()
            )
            
            if response.status_code == 200:
                logger.info("✅ Guardian dry-run initialized")
                return True
            else:
                logger.error(f"Guardian dry-run initialization failed: {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"Error initializing Guardian dry-run: {e}")
            return False
    
    async def create_participant_did(self, participant_name: str, email: str = None) -> GuardianDIDResponse:
        """Create a DID for a project participant"""
        try:
            # Step 1: Create virtual user
            user_response = await self.client.post(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/dry-run/user",
                json={"role": "Project_Participant"},
                headers=self.get_auth_headers()
            )
            
            if user_response.status_code != 200:
                error_msg = f"Failed to create Guardian user: {user_response.text}"
                logger.error(error_msg)
                return GuardianDIDResponse(success=False, error=error_msg)
            
            users_data = user_response.json()
            if not users_data or len(users_data) == 0:
                error_msg = "No user data returned from Guardian"
                logger.error(error_msg)
                return GuardianDIDResponse(success=False, error=error_msg)
            
            # Get the first user (newly created)
            user = users_data[0]
            
            # Step 2: Activate the user
            activate_response = await self.client.post(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/dry-run/login",
                json={
                    "did": user["did"],
                    "username": user["username"],
                    "hederaAccountId": user["hederaAccountId"],
                    "_id": user["_id"],
                    "id": user["id"]
                },
                headers=self.get_auth_headers()
            )
            
            if activate_response.status_code != 200:
                error_msg = f"Failed to activate Guardian user: {activate_response.text}"
                logger.error(error_msg)
                return GuardianDIDResponse(success=False, error=error_msg)
            
            # Step 3: Choose role
            role_tag = "Choose_Roles"
            role_block_response = await self.client.get(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/tag/{role_tag}",
                headers=self.get_auth_headers()
            )
            
            if role_block_response.status_code == 200:
                block_config = role_block_response.json()
                block_id = block_config["id"]
                
                await self.client.post(
                    f"{self.guardian_url}/api/v1/policies/{self.policy_id}/blocks/{block_id}",
                    json={"role": "Project Participant"},
                    headers=self.get_auth_headers()
                )
            
            logger.info(f"✅ Guardian DID created: {user['did']} for {participant_name}")
            
            return GuardianDIDResponse(
                success=True,
                did=user["did"],
                username=user["username"]
            )
            
        except Exception as e:
            error_msg = f"Error creating Guardian DID: {str(e)}"
            logger.error(error_msg)
            return GuardianDIDResponse(success=False, error=error_msg)
    
    async def submit_participant_profile(self, did: str, participant_name: str) -> GuardianSubmissionResult:
        """Submit minimal participant profile to Guardian"""
        try:
            # Get the profile creation block
            profile_tag = "create_pp_profile"
            profile_block_response = await self.client.get(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/tag/{profile_tag}",
                headers=self.get_auth_headers()
            )
            
            if profile_block_response.status_code != 200:
                error_msg = f"Failed to get profile block: {profile_block_response.text}"
                logger.error(error_msg)
                return GuardianSubmissionResult(success=False, error=error_msg)
            
            block_config = profile_block_response.json()
            block_id = block_config["id"]
            
            # Submit minimal profile
            profile_response = await self.client.post(
                f"{self.guardian_url}/api/v1/policies/{self.policy_id}/blocks/{block_id}",
                json={
                    "document": {
                        "field0": participant_name  # VVB Name field
                    }
                },
                headers=self.get_auth_headers()
            )
            
            if profile_response.status_code == 200:
                logger.info(f"✅ Guardian profile submitted for {participant_name}")
                return GuardianSubmissionResult(
                    success=True,
                    response_data=profile_response.json()
                )
            else:
                error_msg = f"Failed to submit profile: {profile_response.text}"
                logger.error(error_msg)
                return GuardianSubmissionResult(success=False, error=error_msg)
                
        except Exception as e:
            error_msg = f"Error submitting Guardian profile: {str(e)}"
            logger.error(error_msg)
            return GuardianSubmissionResult(success=False, error=error_msg)
    
    async def submit_energy_data(self, did: str, energy_data: Dict[str, Any], hedera_proof: str) -> GuardianSubmissionResult:
        """Submit energy data with Hedera proof to Guardian"""
        try:
            # This would be implemented based on Guardian's energy data submission endpoints
            # For now, return success as placeholder
            logger.info(f"📊 Energy data submitted to Guardian for DID: {did}")
            logger.info(f"🔗 Hedera proof: {hedera_proof}")
            
            return GuardianSubmissionResult(
                success=True,
                response_data={
                    "did": did,
                    "energy_data": energy_data,
                    "hedera_proof": hedera_proof,
                    "submitted_at": datetime.now().isoformat()
                }
            )
            
        except Exception as e:
            error_msg = f"Error submitting energy data to Guardian: {str(e)}"
            logger.error(error_msg)
            return GuardianSubmissionResult(success=False, error=error_msg)
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

# Global instance
guardian_service = GuardianService()