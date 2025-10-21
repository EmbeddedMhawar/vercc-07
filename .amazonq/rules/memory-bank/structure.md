# VerifiedCC - Project Structure

## Directory Organization

### Root Structure

```
vercc-07/
├── .amazonq/rules/memory-bank/     # AI assistant memory bank
├── .idx/                           # IDX development environment config
├── .kiro/settings/                 # Kiro MCP settings
├── docs/                          # Project documentation
├── frontend/                      # React application
└── main.py                       # Backend entry point (placeholder)
```

### Frontend Architecture (`/frontend/`)

```
frontend/
├── public/                        # Static assets
│   └── verifiedcc-logo.png       # Brand logo
├── src/                          # Source code
│   ├── archive/                  # Legacy HTML files
│   ├── assets/                   # Application assets
│   ├── components/               # Reusable UI components
│   ├── contexts/                 # React contexts
│   ├── lib/                      # External service integrations
│   ├── pages/                    # Page components
│   ├── styles/                   # Global styles
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── vite-env.d.ts            # Vite type definitions
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Documentation Structure (`/docs/`)

```
docs/
├── animations/                   # Animation implementation guides
├── authentification/            # Auth setup documentation
├── components/                  # Component architecture docs
├── dashboard/                   # Dashboard design documentation
├── deployement/                 # Deployment guides (Cloudflare)
├── policy/                      # Business policy documentation
├── tasks/                       # Project task management
├── UI Feedback/                 # User interface feedback
└── workflow/                    # Development workflows
```

## Core Components & Relationships

### Component Architecture

- **InteractiveElement**: Base component for animated UI elements with gradient effects
- **InteractiveGradientBackground**: Specialized background animation component
- **Button**: Standardized button component with consistent styling
- **Card**: Container component for content sections
- **Icon**: Icon wrapper component using Lucide React
- **ProtectedRoute**: Authentication guard for protected pages

### Page Components

- **LandingPage**: Marketing homepage with 3D animations
- **SigninPage**: Authentication interface with gradient backgrounds
- **DashboardPage**: Main application interface for authenticated users

### Context Providers

- **AuthContext**: Global authentication state management using Supabase

### Service Layer

- **supabase.ts**: Supabase client configuration and API integration

## Architectural Patterns

### Component Composition

- Modular component design with clear separation of concerns
- Props-based configuration for flexibility
- Ref forwarding for DOM access when needed
- TypeScript interfaces for type safety

### State Management

- React Context for global state (authentication)
- Local component state for UI interactions
- Custom hooks for reusable logic

### Styling Architecture

- Tailwind CSS utility-first approach
- CSS-in-JS for complex animations (styled-jsx)
- Custom CSS variables for theme consistency
- Responsive design patterns

### Authentication Flow

- Supabase Auth integration
- Protected route pattern
- Context-based session management
- Automatic redirect handling

## Development Workflow

- **Frontend-first approach**: Visualize logic before implementation
- **Component-driven development**: Build reusable UI components
- **Documentation-driven**: Maintain comprehensive docs alongside code
- **Conventional commits**: Structured commit messages for version history
- **Task prioritization**: Eisenhower matrix (A-D priority levels)
