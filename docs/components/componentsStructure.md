/src
  /components
    Button.tsx          // Custom button (for CTAs, Learn More, etc.)
    Card.tsx            // Info/feature card (used in sections like "Problem We Solve")
    Icon.tsx            // Lucide or other icon wrapper (optional, for reusable icon logic)
  /pages
    LandingPage.tsx     // Your static landing page, imports shared components
    SigninPage.tsx      // User authentication form, uses Button, Navbar, etc.
    DashboardPage.tsx   // Main app dashboard, imports Button, Card, Navbar, Footer, etc.
  App.tsx               // Routing and page assembly
  /assets
    verifiedcc-logo.png
    // any additional images or icons
  /styles
    main.css            // Tailwind or global style overrides