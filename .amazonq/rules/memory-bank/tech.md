# VerifiedCC - Technology Stack

## Programming Languages & Versions

### Frontend

- **TypeScript**: ^5.5.3 (primary language)
- **JavaScript**: ES2022+ (via Vite/TypeScript compilation)
- **CSS**: CSS3 with PostCSS processing
- **HTML**: HTML5 (via JSX/TSX)

### Backend (Planned)

- **Python**: Latest (FastAPI backend)
- **SQL**: PostgreSQL (via Supabase)

## Core Technologies

### Frontend Framework

- **React**: ^18.3.1
  - React DOM: ^18.3.1
  - React Router DOM: ^7.9.3 (client-side routing)

### Build System & Development

- **Vite**: ^5.4.2 (build tool and dev server)
- **@vitejs/plugin-react**: ^4.3.1 (React integration)
- **TypeScript**: ^5.5.3 (type checking and compilation)

### Styling & UI

- **Tailwind CSS**: ^3.4.1 (utility-first CSS framework)
- **PostCSS**: ^8.4.35 (CSS processing)
- **Autoprefixer**: ^10.4.18 (vendor prefixes)
- **Lucide React**: ^0.344.0 (icon library)

### Authentication & Backend Services

- **Supabase**: ^2.74.0 (BaaS - authentication, database, real-time)
- **@supabase/auth-ui-react**: ^0.4.7 (pre-built auth components)
- **@supabase/auth-ui-shared**: ^0.1.8 (shared auth utilities)

### Code Quality & Linting

- **ESLint**: ^9.9.1 (code linting)
- **@eslint/js**: ^9.9.1 (ESLint JavaScript rules)
- **typescript-eslint**: ^8.3.0 (TypeScript ESLint integration)
- **eslint-plugin-react-hooks**: ^5.1.0-rc.0 (React hooks linting)
- **eslint-plugin-react-refresh**: ^0.4.11 (React refresh linting)

## Development Commands

### Package Management

```bash
npm install          # Install dependencies
npm update          # Update dependencies
```

### Development Server

```bash
npm run dev         # Start development server (Vite)
npm run preview     # Preview production build locally
```

### Build & Production

```bash
npm run build       # Build for production
npm run typecheck   # Type checking without emit
```

### Code Quality

```bash
npm run lint        # Run ESLint
```

## Configuration Files

### Build Configuration

- **vite.config.ts**: Vite build configuration
- **tsconfig.json**: TypeScript compiler options
- **tsconfig.app.json**: App-specific TypeScript config
- **tsconfig.node.json**: Node.js TypeScript config

### Styling Configuration

- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS plugin configuration

### Code Quality Configuration

- **eslint.config.js**: ESLint rules and settings

### Environment Configuration

- **.env**: Environment variables (Supabase keys, etc.)
- **.gitignore**: Git ignore patterns

## Deployment & Infrastructure

### Current Deployment

- **Platform**: Cloudflare Pages (planned)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`

### Environment Variables

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## Development Environment

### IDE Support

- **Amazon Q**: AI assistant integration
- **IDX**: Google's cloud-based development environment
- **Kiro**: MCP (Model Context Protocol) integration

### Version Control

- **Git**: Version control system
- **Conventional Commits**: Structured commit message format

## Browser Support

- Modern browsers supporting ES2022+
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (responsive design)

## Performance Optimizations

- **Vite**: Fast HMR (Hot Module Replacement)
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Dynamic imports for route-based splitting
- **Asset Optimization**: Automatic image and asset optimization
