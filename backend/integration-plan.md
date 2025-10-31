# Frontend-Solid Integration Plan

## Overview
Integration plan to connect the existing FastAPI backend (main.py) and Guardian Service automation (AMS-I.D.py) with the SolidJS frontend for a complete carbon credit monitoring and management system.

## Current System Analysis

### Backend Capabilities (main.py)
- FastAPI server with real-time ESP32 data collection
- WebSocket support for live updates
- Supabase integration for data persistence
- Mock data generation for testing
- Energy monitoring and device management

### Guardian Service Integration (AMS-I.D.py)
- Authentication with Guardian Service API
- Policy dry-run management
- Virtual user creation and role assignment
- Project participant profile creation
- Dynamic project creation with schema validation

### Frontend Structure (frontend-solid)
- SolidJS application with TypeScript
- Dashboard, SignIn pages, and interactive components
- CSS styling system in place

## Integration Strategy

### Phase 1: API Integration Layer
**Goal**: Connect frontend to backend APIs

#### 1.1 Create API Service Layer
- Create `src/services/api.ts` for backend communication
- Implement HTTP client with error handling
- Add WebSocket client for real-time data
- Create type definitions for API responses

#### 1.2 Backend API Endpoints
- Extend main.py with authentication endpoints
- Add user management endpoints
- Create project management endpoints
- Implement Guardian Service proxy endpoints

#### 1.3 State Management
- Set up SolidJS stores for global state
- Create stores for:
  - User authentication
  - Energy data (real-time)
  - Project data
  - Device management

### Phase 2: Authentication System
**Goal**: Implement secure user authentication

#### 2.1 Frontend Authentication
- Update SigninPage.tsx with real authentication
- Add JWT token management
- Implement protected routes
- Add logout functionality

#### 2.2 Backend Authentication
- Integrate Guardian Service authentication into main.py
- Add JWT middleware for protected endpoints
- Create user session management
- Implement refresh token handling

### Phase 3: Real-time Dashboard
**Goal**: Replace dashboard_content.py with SolidJS frontend and display live energy data

#### 3.1 Dashboard Migration
- **Remove dashboard_content.py dependency** from main.py
- Update main.py to serve SolidJS frontend instead of embedded HTML
- Configure FastAPI to serve static files from frontend build
- Update DashboardPage.tsx with real-time data from backend APIs

#### 3.2 Dashboard Enhancement
- Add WebSocket connection for live updates
- Create energy monitoring widgets matching current dashboard functionality
- Implement device status indicators
- Add real-time ESP32 data display

#### 3.3 Functional Integration
- Make existing DashboardPage.tsx components functional with real data
- Connect InteractiveElement.tsx to backend APIs
- Implement device health monitoring using existing layout
- Use current CSS styling and component structure
- Focus on data integration rather than new visualizations

### Phase 4: Guardian Service Integration
**Goal**: Integrate carbon credit project management

#### 4.1 Project Management UI
- Create project creation forms
- Add project participant profile management
- Implement role selection interface
- Add project status tracking

#### 4.2 Guardian Service Proxy
- Create proxy endpoints in main.py for Guardian Service
- Implement policy management endpoints
- Add virtual user management
- Create project submission workflows

### Phase 5: Carbon Credit Workflow
**Goal**: Complete carbon credit generation pipeline

#### 5.1 Energy to Credit Conversion
- Implement energy data aggregation
- Create carbon credit calculation logic
- Add project reporting features
- Implement credit verification workflow

#### 5.2 Reporting Dashboard
- Create carbon credit reports
- Add project performance analytics
- Implement export functionality
- Add compliance reporting

## Implementation Steps

### Step 1: Setup API Communication (Week 1)
```typescript
// Create src/services/api.ts
// Create src/types/api.ts
// Update DashboardPage.tsx with API calls
// Test backend connectivity
```

### Step 2: Authentication Flow (Week 1-2)
```python
# Extend main.py with auth endpoints
# Integrate Guardian Service auth
# Update frontend authentication
# Test login/logout flow
```

### Step 3: Dashboard Migration & Real-time Data (Week 2)
```python
# Remove dashboard_content.py import from main.py
# Update main.py root endpoint to serve SolidJS frontend
# Configure static file serving for frontend build
```

```typescript
// Build SolidJS frontend for production
// Implement WebSocket client in frontend
// Update DashboardPage.tsx with live data from backend
// Make InteractiveElement.tsx functional with real data
// Connect existing components to backend APIs
// Test real-time updates with current layout
```

### Step 4: Guardian Integration (Week 3)
```python
# Create Guardian Service proxy endpoints
# Implement project management APIs
# Add virtual user management
# Test Guardian Service integration
```

### Step 5: Complete Workflow (Week 4)
```typescript
// Create project management UI
// Implement carbon credit calculations
// Add reporting features
// End-to-end testing
```

## Technical Requirements

### Frontend Dependencies
```json
{
  "@solidjs/router": "^0.8.2",
  "solid-js": "^1.7.8",
  "axios": "^1.4.0",
  "date-fns": "^2.30.0"
}
```

### Backend Dependencies
```python
# Already installed: fastapi, uvicorn, supabase, requests
# Additional: python-jose[cryptography], passlib[bcrypt]
```

### Environment Variables
```env
# Backend (.env)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
JWT_SECRET_KEY=your_jwt_secret
GUARDIAN_SERVICE_URL=https://guardianservice.app

# Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000/ws
```

## File Structure Changes

### New Frontend Files
```
src/
├── services/
│   ├── api.ts              # HTTP client
│   ├── websocket.ts        # WebSocket client
│   └── guardian.ts         # Guardian Service integration
├── stores/
│   ├── auth.ts             # Authentication state
│   ├── energy.ts           # Energy data state
│   └── projects.ts         # Project management state
├── types/
│   ├── api.ts              # API type definitions
│   ├── energy.ts           # Energy data types
│   └── guardian.ts         # Guardian Service types
└── components/
    ├── DeviceStatus.tsx    # Device monitoring (enhance existing InteractiveElement)
    └── ProjectForm.tsx     # Project creation form
```

### Backend Extensions
```
├── auth/
│   ├── __init__.py
│   ├── jwt_handler.py      # JWT token management
│   └── guardian_auth.py    # Guardian Service auth
├── guardian/
│   ├── __init__.py
│   ├── client.py           # Guardian Service client
│   └── models.py           # Guardian data models
└── models/
    ├── __init__.py
    ├── user.py             # User models
    └── project.py          # Project models
```

## Success Metrics

### Phase 1 Success
- [ ] Frontend can fetch data from backend
- [ ] WebSocket connection established
- [ ] Real-time data display working

### Phase 2 Success
- [ ] User authentication working
- [ ] Protected routes implemented
- [ ] JWT token management functional

### Phase 3 Success
- [ ] Existing SolidJS frontend functional with backend data
- [ ] Device status monitoring using current layout
- [ ] Real-time data display in existing components

### Phase 4 Success
- [ ] Guardian Service integration working
- [ ] Project creation functional
- [ ] Virtual user management operational

### Phase 5 Success
- [ ] End-to-end carbon credit workflow
- [ ] Energy to credit conversion
- [ ] Complete reporting system

## Risk Mitigation

### Technical Risks
- **WebSocket Connection Issues**: Implement reconnection logic and fallback polling
- **Guardian Service API Changes**: Create abstraction layer for API calls
- **Real-time Performance**: Implement data throttling and efficient updates

### Integration Risks
- **Authentication Complexity**: Start with simple JWT, expand gradually
- **Data Synchronization**: Implement proper error handling and retry logic
- **Cross-Origin Issues**: Configure CORS properly for all environments

## Next Steps

1. **Immediate**: 
   - Remove dashboard_content.py dependency from main.py
   - Create API service layer and test backend connectivity
   - Configure main.py to serve SolidJS frontend instead of embedded HTML
2. **Week 1**: Implement authentication flow and migrate dashboard to SolidJS
3. **Week 2**: Add real-time data display and integrate Guardian Service
4. **Week 3**: Complete project management and carbon credit workflow
5. **Week 4**: Polish UI/UX and deploy to production

This plan provides a structured approach to integrate all components into a cohesive carbon credit monitoring and management system.