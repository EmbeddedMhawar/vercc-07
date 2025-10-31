# Implementation Plan

- [ ] 1. Set up new backend directory structure and configuration system
  - Create the new modular directory structure under backend/app/
  - Implement centralized configuration management with type-safe settings
  - Set up environment variable handling and validation
  - Create database connection management
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 2. Extract and modularize core services
  - [ ] 2.1 Create base service interfaces and dependency injection system
    - Implement BaseService abstract class and service interfaces
    - Set up dependency injection container for services
    - Create service factory patterns for initialization
    - _Requirements: 3.1, 3.2_

  - [ ] 2.2 Extract Guardian Service into dedicated service module
    - Move Guardian API integration logic from main.py to guardian_service.py
    - Implement proper error handling and logging for Guardian operations
    - Create Guardian service interface and implementation
    - _Requirements: 3.3, 3.5_

  - [ ] 2.3 Extract Hedera Service into dedicated service module
    - Move Hedera blockchain integration logic from main.py to hedera_service.py
    - Implement batch processing service with proper error handling
    - Create Hedera service interface and implementation
    - _Requirements: 3.4, 3.5_

  - [ ] 2.4 Create energy processing service
    - Extract energy data processing logic into dedicated service
    - Implement carbon credit calculation logic
    - Add data validation and transformation methods
    - _Requirements: 3.5_

  - [ ] 2.5 Create WebSocket connection management service
    - Extract WebSocket connection manager from main.py
    - Implement proper connection lifecycle management
    - Add broadcasting and message handling logic
    - _Requirements: 3.5_

- [ ] 3. Implement repository pattern for data access
  - [ ] 3.1 Create base repository interface and implementation
    - Implement generic repository pattern with CRUD operations
    - Set up Supabase client integration and connection management
    - Add transaction management and error handling
    - _Requirements: 5.1, 5.4, 5.5_

  - [ ] 3.2 Implement energy data repository
    - Create repository for energy readings with optimized queries
    - Implement batch operations for energy data storage
    - Add data retrieval methods with filtering and pagination
    - _Requirements: 5.1, 5.2_

  - [ ] 3.3 Implement participant repository
    - Create repository for Guardian participant management
    - Implement participant CRUD operations with proper validation
    - Add participant status tracking and updates
    - _Requirements: 5.1, 5.2_

  - [ ] 3.4 Implement proof repository
    - Create repository for Hedera proof anchor management
    - Implement batch content storage and retrieval
    - Add proof verification and lookup methods
    - _Requirements: 5.1, 5.2_

- [ ] 4. Reorganize API layer into modular routers
  - [ ] 4.1 Create API router structure and dependency injection
    - Set up FastAPI router organization with versioning
    - Implement dependency injection for services in API layer
    - Create common API dependencies and utilities
    - _Requirements: 4.1, 4.4_

  - [ ] 4.2 Create energy data API router
    - Move energy data endpoints from main.py to dedicated router
    - Implement proper request/response validation with Pydantic
    - Add comprehensive error handling for energy endpoints
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ] 4.3 Create participant management API router
    - Move participant endpoints from main.py to dedicated router
    - Implement Guardian integration endpoints with proper validation
    - Add participant status and management endpoints
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ] 4.4 Create proof and verification API router
    - Move Hedera proof endpoints from main.py to dedicated router
    - Implement proof verification and lookup endpoints
    - Add batch proof management endpoints
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ] 4.5 Create health and monitoring API router
    - Move health check endpoints from main.py to dedicated router
    - Implement comprehensive system health monitoring
    - Add service status and metrics endpoints
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ] 4.6 Create testing API router
    - Move mock data endpoints from main.py to dedicated router
    - Implement test data generation and control endpoints
    - Add development and testing utilities
    - _Requirements: 4.3, 4.4, 4.5_

- [ ] 5. Implement middleware and cross-cutting concerns
  - [ ] 5.1 Create logging middleware and structured logging
    - Implement request/response logging middleware with correlation IDs
    - Set up structured logging with proper log levels and formatting
    - Add performance monitoring and request timing
    - _Requirements: 6.1, 6.2_

  - [ ] 5.2 Implement error handling middleware
    - Create global exception handlers for consistent error responses
    - Implement validation error handling with detailed messages
    - Add service-specific error handling and recovery
    - _Requirements: 6.2, 4.4_

  - [ ] 5.3 Configure CORS and authentication middleware
    - Set up CORS middleware for frontend integration
    - Implement authentication middleware for protected endpoints
    - Add request validation and security headers
    - _Requirements: 6.3, 6.4_

- [ ] 6. Manage static content and dashboard serving
  - [ ] 6.1 Extract dashboard content into separate module
    - Move dashboard HTML from dashboard_content.py to static module
    - Implement configurable dashboard serving with template support
    - Add static asset management and caching
    - _Requirements: 7.1, 7.4_

  - [ ] 6.2 Implement flexible frontend serving
    - Create configurable static file serving for different frontend builds
    - Support both embedded dashboard and SolidJS frontend serving
    - Implement proper caching headers and compression
    - _Requirements: 7.2, 7.3, 7.4, 7.5_

- [ ] 7. Create comprehensive testing infrastructure
  - [ ] 7.1 Set up test configuration and fixtures
    - Create test configuration with mock services and database
    - Implement test fixtures for common test scenarios
    - Set up test database and service mocking
    - _Requirements: 8.1, 8.4_

  - [ ]* 7.2 Write unit tests for service layer
    - Create unit tests for Guardian service operations
    - Write unit tests for Hedera service and batch processing
    - Add unit tests for energy processing and validation
    - _Requirements: 8.2, 8.5_

  - [ ]* 7.3 Write integration tests for API endpoints
    - Create integration tests for energy data endpoints
    - Write integration tests for participant management endpoints
    - Add integration tests for proof and verification endpoints
    - _Requirements: 8.3, 8.5_

  - [ ]* 7.4 Write repository and database tests
    - Create tests for repository CRUD operations
    - Write tests for database connection and transaction management
    - Add tests for data validation and error handling
    - _Requirements: 8.2, 8.5_

- [ ] 8. Update main application and ensure backward compatibility
  - [ ] 8.1 Refactor main.py to use new modular structure
    - Update main.py to initialize services and routers from new modules
    - Implement proper application factory pattern
    - Ensure all existing endpoints remain functional
    - _Requirements: 1.5_

  - [ ] 8.2 Validate backward compatibility and API contracts
    - Test all existing API endpoints to ensure they work unchanged
    - Validate WebSocket functionality and real-time features
    - Ensure mock data generation and testing endpoints work
    - _Requirements: 1.5_

  - [ ] 8.3 Update configuration and deployment setup
    - Update environment variable handling and configuration files
    - Ensure proper startup sequence and service initialization
    - Test application startup and shutdown procedures
    - _Requirements: 2.1, 2.2, 2.3_

- [ ] 9. Documentation and cleanup
  - [ ] 9.1 Update code documentation and type hints
    - Add comprehensive docstrings to all new modules and functions
    - Ensure proper type hints throughout the codebase
    - Create API documentation with examples
    - _Requirements: 1.1, 1.2_

  - [ ] 9.2 Clean up legacy code and remove unused imports
    - Remove unused code and imports from refactored modules
    - Clean up temporary files and development artifacts
    - Ensure code formatting and linting compliance
    - _Requirements: 1.1_