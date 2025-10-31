# Backend Organization Design

## Overview

This design transforms the monolithic FastAPI backend into a well-structured, modular architecture following Python best practices. The new structure separates concerns into distinct layers: API routes, business services, data access, and configuration management. This design maintains full backward compatibility while enabling easier testing, maintenance, and future enhancements.

## Architecture

### High-Level Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization and startup
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py         # Configuration management
│   │   └── database.py         # Database connection setup
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependency injection
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py       # Main API router
│   │   │   ├── energy.py       # Energy data endpoints
│   │   │   ├── participants.py # Guardian participant endpoints
│   │   │   ├── proofs.py       # Hedera proof endpoints
│   │   │   ├── health.py       # Health and monitoring endpoints
│   │   │   └── testing.py      # Mock data and testing endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── energy_service.py   # Energy data processing
│   │   ├── guardian_service.py # Guardian API integration
│   │   ├── hedera_service.py   # Hedera blockchain integration
│   │   └── websocket_service.py # WebSocket connection management
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── base.py             # Base repository pattern
│   │   ├── energy_repository.py
│   │   ├── participant_repository.py
│   │   └── proof_repository.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py         # SQLAlchemy/Supabase models
│   │   ├── api.py              # Pydantic API models
│   │   └── domain.py           # Business domain models
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── logging.py          # Request logging middleware
│   │   ├── cors.py             # CORS configuration
│   │   └── error_handling.py   # Global error handling
│   ├── static/
│   │   ├── dashboard.py        # Embedded dashboard content
│   │   └── assets/             # Static assets
│   └── utils/
│       ├── __init__.py
│       ├── mock_data.py        # Mock data generation
│       └── helpers.py          # Utility functions
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Test configuration
│   ├── test_api/
│   ├── test_services/
│   └── test_repositories/
├── requirements.txt
└── .env.example
```

### Layer Responsibilities

#### API Layer (`app/api/`)
- Route definitions and HTTP request handling
- Request/response validation using Pydantic
- Dependency injection for services
- Error handling and status code management
- API versioning support

#### Service Layer (`app/services/`)
- Business logic implementation
- External service integration (Guardian, Hedera)
- Data processing and transformation
- WebSocket connection management
- Mock data generation for testing

#### Repository Layer (`app/repositories/`)
- Database operations and queries
- Data persistence abstraction
- Transaction management
- Connection pooling
- Query optimization

#### Configuration Layer (`app/config/`)
- Environment variable management
- Type-safe configuration objects
- Database connection setup
- Service initialization

## Components and Interfaces

### Configuration System

```python
# app/config/settings.py
from pydantic import BaseSettings, Field
from typing import Optional

class DatabaseSettings(BaseSettings):
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_anon_key: str = Field(..., env="SUPABASE_ANON_KEY")
    
class GuardianSettings(BaseSettings):
    guardian_url: str = Field("https://guardianservice.app", env="GUARDIAN_URL")
    guardian_email: Optional[str] = Field(None, env="GUARDIAN_EMAIL")
    guardian_password: Optional[str] = Field(None, env="GUARDIAN_PASSWORD")
    policy_id: str = Field("68d69341152381fe552b21ec", env="GUARDIAN_POLICY_ID")

class HederaSettings(BaseSettings):
    hedera_service_url: str = Field("http://localhost:3001", env="HEDERA_SERVICE_URL")
    
class AppSettings(BaseSettings):
    app_name: str = "ESP32 Carbon Credit Backend"
    version: str = "0.6"
    debug: bool = Field(False, env="DEBUG")
    port: int = Field(5000, env="PORT")
    
    database: DatabaseSettings = DatabaseSettings()
    guardian: GuardianSettings = GuardianSettings()
    hedera: HederaSettings = HederaSettings()
```

### Service Interfaces

```python
# app/services/base.py
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class BaseService(ABC):
    """Base service interface for dependency injection"""
    pass

class EnergyProcessingService(BaseService):
    @abstractmethod
    async def process_reading(self, reading: Dict[str, Any]) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    async def calculate_carbon_credits(self, energy_kwh: float) -> float:
        pass

class GuardianIntegrationService(BaseService):
    @abstractmethod
    async def create_participant_did(self, name: str, email: str) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    async def submit_energy_data(self, did: str, data: Dict[str, Any]) -> Dict[str, Any]:
        pass
```

### Repository Pattern

```python
# app/repositories/base.py
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, TypeVar, Generic
from supabase import Client

T = TypeVar('T')

class BaseRepository(Generic[T], ABC):
    def __init__(self, supabase_client: Client):
        self.client = supabase_client
    
    @abstractmethod
    async def create(self, data: Dict[str, Any]) -> T:
        pass
    
    @abstractmethod
    async def get_by_id(self, id: str) -> Optional[T]:
        pass
    
    @abstractmethod
    async def update(self, id: str, data: Dict[str, Any]) -> T:
        pass
    
    @abstractmethod
    async def delete(self, id: str) -> bool:
        pass
```

### API Router Structure

```python
# app/api/v1/router.py
from fastapi import APIRouter
from .energy import router as energy_router
from .participants import router as participants_router
from .proofs import router as proofs_router
from .health import router as health_router
from .testing import router as testing_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(energy_router, prefix="/energy", tags=["energy"])
api_router.include_router(participants_router, prefix="/participants", tags=["participants"])
api_router.include_router(proofs_router, prefix="/proofs", tags=["proofs"])
api_router.include_router(health_router, prefix="/health", tags=["health"])
api_router.include_router(testing_router, prefix="/test", tags=["testing"])
```

## Data Models

### Domain Models

```python
# app/models/domain.py
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Dict, Any

@dataclass
class EnergyReading:
    device_id: str
    current: float
    voltage: float
    power: float
    total_energy_kwh: float
    efficiency: float
    ambient_temp_c: float
    irradiance_w_m2: float
    power_factor: float
    timestamp: datetime
    
@dataclass
class Participant:
    id: str
    name: str
    email: Optional[str]
    did: Optional[str]
    profile_status: str
    created_at: datetime
    updated_at: datetime
```

### API Models

```python
# app/models/api.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict, Any

class EnergyReadingRequest(BaseModel):
    device_id: str = Field(..., min_length=1)
    current: float = Field(..., ge=0)
    voltage: float = Field(..., ge=0)
    power: float = Field(..., ge=0)
    total_energy_kwh: float = Field(..., ge=0)
    efficiency: float = Field(..., ge=0, le=1)
    ambient_temp_c: float
    irradiance_w_m2: float = Field(..., ge=0)
    power_factor: float = Field(..., ge=0, le=1)

class EnergyReadingResponse(BaseModel):
    status: str
    message: str
    server_time: datetime
    device_id: str
    power: float
```

## Error Handling

### Global Exception Handler

```python
# app/middleware/error_handling.py
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import logging

logger = logging.getLogger(__name__)

async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP {exc.status_code}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={"error": "Validation failed", "details": exc.errors()}
    )
```

### Service-Level Error Handling

```python
# app/services/energy_service.py
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class EnergyProcessingError(Exception):
    pass

class EnergyService:
    async def process_reading(self, reading: Dict[str, Any]) -> Dict[str, Any]:
        try:
            # Validation logic
            validated_reading = self._validate_reading(reading)
            
            # Processing logic
            processed_reading = self._process_reading(validated_reading)
            
            return processed_reading
            
        except ValueError as e:
            logger.error(f"Validation error: {e}")
            raise EnergyProcessingError(f"Invalid reading data: {e}")
        except Exception as e:
            logger.error(f"Unexpected error processing reading: {e}")
            raise EnergyProcessingError(f"Processing failed: {e}")
```

## Testing Strategy

### Test Configuration

```python
# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import create_app
from app.config.settings import AppSettings

@pytest.fixture
def test_settings():
    return AppSettings(
        debug=True,
        database=DatabaseSettings(
            supabase_url="test_url",
            supabase_anon_key="test_key"
        )
    )

@pytest.fixture
def test_client(test_settings):
    app = create_app(test_settings)
    return TestClient(app)

@pytest.fixture
def mock_supabase_client():
    # Mock Supabase client for testing
    pass
```

### Service Testing

```python
# tests/test_services/test_energy_service.py
import pytest
from app.services.energy_service import EnergyService
from app.services.energy_service import EnergyProcessingError

class TestEnergyService:
    @pytest.fixture
    def energy_service(self):
        return EnergyService()
    
    async def test_process_valid_reading(self, energy_service):
        reading = {
            "device_id": "ESP32_001",
            "current": 1.5,
            "voltage": 220.0,
            "power": 330.0,
            # ... other fields
        }
        
        result = await energy_service.process_reading(reading)
        
        assert result["device_id"] == "ESP32_001"
        assert "timestamp" in result
    
    async def test_process_invalid_reading(self, energy_service):
        invalid_reading = {"device_id": ""}  # Missing required fields
        
        with pytest.raises(EnergyProcessingError):
            await energy_service.process_reading(invalid_reading)
```

### API Testing

```python
# tests/test_api/test_energy.py
import pytest
from fastapi.testclient import TestClient

class TestEnergyAPI:
    def test_post_energy_data_success(self, test_client):
        reading_data = {
            "device_id": "ESP32_TEST",
            "current": 1.0,
            "voltage": 220.0,
            "power": 220.0,
            "total_energy_kwh": 0.1,
            "efficiency": 0.85,
            "ambient_temp_c": 25.0,
            "irradiance_w_m2": 800.0,
            "power_factor": 0.95
        }
        
        response = test_client.post("/api/v1/energy/data", json=reading_data)
        
        assert response.status_code == 200
        assert response.json()["status"] == "success"
    
    def test_post_energy_data_validation_error(self, test_client):
        invalid_data = {"device_id": ""}  # Invalid data
        
        response = test_client.post("/api/v1/energy/data", json=invalid_data)
        
        assert response.status_code == 422
```

## Migration Strategy

### Phase 1: Structure Setup
1. Create new directory structure
2. Move existing code into appropriate modules
3. Set up configuration management
4. Implement dependency injection

### Phase 2: Service Extraction
1. Extract Guardian service logic
2. Extract Hedera service logic
3. Extract energy processing logic
4. Implement service interfaces

### Phase 3: Repository Implementation
1. Create repository interfaces
2. Implement Supabase repositories
3. Add transaction management
4. Update services to use repositories

### Phase 4: API Reorganization
1. Split routes into domain-specific modules
2. Implement proper error handling
3. Add request/response validation
4. Update middleware configuration

### Phase 5: Testing and Validation
1. Add comprehensive test suite
2. Validate backward compatibility
3. Performance testing
4. Documentation updates

## Deployment Considerations

### Environment Configuration
- Separate configuration files for development, testing, and production
- Secure handling of sensitive configuration values
- Configuration validation at startup

### Static Content Serving
- Configurable static file serving for dashboard
- Support for both embedded HTML and SolidJS frontend
- Proper caching headers and compression

### Monitoring and Logging
- Structured logging with correlation IDs
- Health check endpoints for monitoring
- Performance metrics collection
- Error tracking and alerting

This design provides a solid foundation for a maintainable, testable, and scalable backend architecture while preserving all existing functionality.