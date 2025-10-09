# Growing Gradient Transition Animation

## Overview
A smooth transition animation where a gradient grows from a clicked button, fills the screen, then shrinks into a card shape on the destination page.

## Animation Flow
1. **Click button** → Circle grows from button position
2. **Fills screen** → Full animated gradient background  
3. **Navigate to new page** → Page changes during full screen
4. **Shrinks to card** → Gradient morphs into target card shape
5. **Reveals content** → Card content appears

## Implementation

### Step 1: Create Animation Component

```typescript
// src/components/GrowingGradientTransition.tsx
import { useState, useEffect } from 'react';

interface GrowingGradientTransitionProps {
  isTriggered: boolean;
  onComplete: () => void;
  triggerElement?: HTMLElement | null;
  targetCardPosition?: { x: number; y: number; width: number; height: number };
}

export function GrowingGradientTransition({ 
  isTriggered, 
  onComplete, 
  triggerElement,
  targetCardPosition 
}: GrowingGradientTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'growing' | 'shrinking'>('idle');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isTriggered && triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      
      setPhase('growing');
      
      setTimeout(() => {
        setPhase('shrinking');
        setTimeout(() => {
          onComplete();
          setPhase('idle');
        }, 800);
      }, 1000);
    }
  }, [isTriggered, triggerElement, onComplete]);

  if (phase === 'idle') return null;

  const getTransformStyle = () => {
    if (phase === 'growing') {
      return {
        left: buttonPosition.x - 25,
        top: buttonPosition.y - 25,
        width: '50px',
        height: '50px',
        transform: 'scale(100)',
        borderRadius: '50%'
      };
    } else {
      // Shrink to card position and shape
      const cardPos = targetCardPosition || { 
        x: window.innerWidth / 2 - 200, 
        y: window.innerHeight / 2 - 150, 
        width: 400, 
        height: 300 
      };
      
      return {
        left: cardPos.x,
        top: cardPos.y,
        width: `${cardPos.width}px`,
        height: `${cardPos.height}px`,
        transform: 'scale(1)',
        borderRadius: '16px' // Card border radius
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="absolute transition-all duration-1000 ease-out opacity-90"
        style={{
          ...getTransformStyle(),
          background: 'linear-gradient(135deg, #10b981, #f59e0b, #3b82f6, #8b5cf6)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 3s ease infinite',
          transformOrigin: 'center'
        }}
      />
      
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
```

### Step 2: Update Source Page (SigninPage)

```typescript
// Add to SigninPage.tsx imports
import { GrowingGradientTransition } from '../components/GrowingGradientTransition';
import { useRef } from 'react';

// Add state variables
const [showTransition, setShowTransition] = useState(false);
const buttonRef = useRef<HTMLButtonElement>(null);

// Update handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    if (isSignUp) {
      // ... existing signup code
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Trigger the animation
      setShowTransition(true);
    }
  } catch (error: any) {
    setError(error.message || "An error occurred");
    setLoading(false);
  }
};

// Add ref to button and transition component
return (
  <>
    <InteractiveGradientBackground />
    <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
      {/* ... existing content ... */}
      
      <button
        ref={buttonRef} // Add this ref
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-oasis-green to-desert-sand text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
      >
        {/* ... button content ... */}
      </button>
      
      {/* ... rest of form ... */}
    </main>
    
    {/* Add the transition component */}
    <GrowingGradientTransition
      isTriggered={showTransition}
      triggerElement={buttonRef.current}
      onComplete={() => {
        setShowTransition(false);
        setLoading(false);
        // Navigation happens via AuthContext
      }}
    />
  </>
);
```

### Step 3: Update Destination Page (Dashboard)

```typescript
// In DashboardPage.tsx
import { useRef, useEffect } from 'react';

export default function DashboardPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen p-6">
      {/* Target card that the animation shrinks into */}
      <div 
        ref={cardRef}
        className="max-w-md mx-auto mt-20 bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl"
      >
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
}
```

## Customization Options

### Timing
- **Growing duration**: Change `1000ms` in setTimeout
- **Shrinking duration**: Change `800ms` in setTimeout
- **CSS transition**: Modify `duration-1000` class

### Gradient Colors
```typescript
background: 'linear-gradient(135deg, #10b981, #f59e0b, #3b82f6, #8b5cf6)'
```

### Card Dimensions
```typescript
const cardPos = { 
  x: window.innerWidth / 2 - 200, 
  y: window.innerHeight / 2 - 150, 
  width: 400, 
  height: 300 
};
```

### Border Radius
- **Circle**: `borderRadius: '50%'`
- **Card**: `borderRadius: '16px'`

## Usage Examples

### Basic Usage
```typescript
<GrowingGradientTransition
  isTriggered={showTransition}
  triggerElement={buttonRef.current}
  onComplete={() => setShowTransition(false)}
/>
```

### With Custom Card Position
```typescript
<GrowingGradientTransition
  isTriggered={showTransition}
  triggerElement={buttonRef.current}
  targetCardPosition={{ x: 100, y: 100, width: 300, height: 200 }}
  onComplete={() => setShowTransition(false)}
/>
```

## Technical Notes

- Uses `fixed` positioning for full-screen overlay
- `pointer-events-none` prevents interaction during animation
- `z-50` ensures animation appears above all content
- CSS-in-JS for dynamic gradient animation
- React refs for precise element positioning
- Cubic bezier easing for smooth transitions

## Browser Support
- Modern browsers with CSS transforms
- React 18+ with hooks support
- Tailwind CSS for styling classes