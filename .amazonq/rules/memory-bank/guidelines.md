# VerifiedCC - Development Guidelines

## Code Quality Standards

### TypeScript Usage (5/5 files)

- **Strict typing**: All components use TypeScript with proper interface definitions
- **Interface naming**: Use descriptive names ending with "Props" for component props (e.g., `InteractiveElementProps`)
- **Type imports**: Import types from external libraries explicitly (`Session` from `@supabase/supabase-js`)
- **Optional properties**: Use `?` for optional props with sensible defaults

### Import Organization (5/5 files)

- **React imports first**: Always import React hooks first (`useState`, `useEffect`, `useRef`)
- **External libraries**: Import third-party libraries after React (Lucide icons, Supabase, React Router)
- **Internal imports**: Import local components, contexts, and utilities last
- **Relative paths**: Use relative imports with `../` for parent directories

### Component Structure (5/5 files)

- **Functional components**: Use arrow function exports as default (`export default function ComponentName()`)
- **Props destructuring**: Destructure props in function parameters with defaults
- **Early returns**: Handle loading states and redirects early in component body
- **Cleanup**: Always return cleanup functions from useEffect hooks

## Styling Architecture

### Tailwind CSS Patterns (5/5 files)

- **Utility-first approach**: Use Tailwind classes for all styling
- **Custom color variables**: Use semantic color names (`deep-ocean`, `oasis-green`, `desert-sand`, `cloud-white`)
- **Responsive design**: Apply responsive prefixes (`md:`, `lg:`) for different screen sizes
- **Gradient usage**: Consistent gradient patterns using `bg-gradient-to-r` and `bg-gradient-to-br`

### Animation Standards (4/5 files)

- **CSS-in-JS**: Use `styled-jsx` for complex animations and dynamic styles
- **Keyframe animations**: Define custom animations (`moveInCircle`, `moveVertical`, `moveHorizontal`)
- **Interactive effects**: Implement mouse-following bubbles with `requestAnimationFrame`
- **Transition classes**: Use Tailwind transition utilities (`transition-all`, `duration-300`)

### Layout Patterns (5/5 files)

- **Container structure**: Use `container mx-auto px-6` for consistent page width
- **Grid layouts**: Use CSS Grid (`grid-cols-1 md:grid-cols-2`) for responsive layouts
- **Flexbox alignment**: Use flex utilities for centering and spacing
- **Z-index layering**: Consistent z-index values (`z-10`, `z-50`) for layering

## State Management

### React Hooks Usage (5/5 files)

- **useState**: Use for local component state with descriptive names
- **useEffect**: Always include dependency arrays, prefer empty arrays for mount-only effects
- **useRef**: Use for DOM element references and mutable values
- **Custom hooks**: Create reusable logic with custom hooks (`useAuth`)

### Context Pattern (2/5 files)

- **Context creation**: Use `createContext` with default values and proper typing
- **Provider pattern**: Wrap components with context providers at appropriate levels
- **Hook abstraction**: Create custom hooks (`useAuth`) to consume context
- **Loading states**: Include loading states in context for better UX

### Form Handling (2/5 files)

- **Controlled inputs**: Use controlled components with state for form inputs
- **Event handling**: Use proper TypeScript event types (`React.FormEvent`)
- **Validation**: Implement client-side validation with error state management
- **Loading states**: Show loading indicators during async operations

## API Integration

### Supabase Patterns (3/5 files)

- **Client initialization**: Import supabase client from centralized lib file
- **Auth handling**: Use Supabase auth methods with proper error handling
- **Session management**: Handle session state through context
- **Error handling**: Catch and display user-friendly error messages

### Async Operations (3/5 files)

- **Try-catch blocks**: Wrap async operations in try-catch for error handling
- **Loading states**: Set loading state before async operations, clear after completion
- **User feedback**: Provide immediate feedback for user actions (alerts, notifications)
- **Error recovery**: Graceful error handling with fallback states

## Component Architecture

### Reusable Components (4/5 files)

- **Prop flexibility**: Accept `className` and spread props (`...props`) for customization
- **Polymorphic components**: Use `as` prop for element type flexibility
- **Size variants**: Implement size props (`small`, `large`) for different use cases
- **Default values**: Provide sensible defaults for optional props

### Interactive Elements (3/5 files)

- **Mouse tracking**: Implement smooth mouse-following effects with easing
- **Animation loops**: Use `requestAnimationFrame` for smooth animations
- **Event cleanup**: Remove event listeners in useEffect cleanup functions
- **Performance optimization**: Use refs to avoid unnecessary re-renders

### Conditional Rendering (5/5 files)

- **Ternary operators**: Use ternary operators for simple conditional rendering
- **Logical AND**: Use `&&` for conditional element rendering
- **Template literals**: Use template literals for dynamic className construction
- **State-based styling**: Change styles based on component state

## Development Practices

### Error Handling (4/5 files)

- **User-friendly messages**: Display clear error messages to users
- **Fallback UI**: Provide fallback states for error conditions
- **Console logging**: Log errors to console for debugging
- **Type guards**: Use proper type checking for error objects

### Performance Optimization (5/5 files)

- **Lazy loading**: Use dynamic imports for route-based code splitting
- **Memoization**: Consider React.memo for expensive components
- **Effect dependencies**: Minimize useEffect dependencies to prevent unnecessary re-runs
- **Event delegation**: Use efficient event handling patterns

### Accessibility (3/5 files)

- **Semantic HTML**: Use proper HTML elements (`button`, `form`, `label`)
- **ARIA attributes**: Include proper labels and descriptions
- **Keyboard navigation**: Ensure components are keyboard accessible
- **Focus management**: Handle focus states appropriately

## Code Organization

### File Structure (5/5 files)

- **Single responsibility**: One component per file with matching filename
- **Export patterns**: Use default exports for main components
- **Interface definitions**: Define interfaces in the same file as components
- **Utility separation**: Keep utility functions in separate files

### Naming Conventions (5/5 files)

- **PascalCase**: Use PascalCase for component names and interfaces
- **camelCase**: Use camelCase for variables, functions, and props
- **Descriptive names**: Use clear, descriptive names for variables and functions
- **Boolean prefixes**: Use `is`, `has`, `should` prefixes for boolean variables

### Documentation (5/5 files)

- **Inline comments**: Add comments for complex logic and business rules
- **JSDoc**: Use JSDoc comments for function documentation when needed
- **README files**: Maintain documentation for setup and configuration
- **Type annotations**: Use TypeScript as documentation for function signatures
