import { Component, onMount, onCleanup, JSX, createSignal, createMemo } from 'solid-js';

interface InteractiveElementProps {
  children: JSX.Element;
  class?: string;
  as?: 'button' | 'div';
  size?: 'small' | 'large';
  backgroundStyle?: 'full' | 'minimal';
  [key: string]: any;
}

export const InteractiveElement: Component<InteractiveElementProps> = (props) => {
  let elementRef: any;
  let bubbleRef: HTMLDivElement | undefined;

  // Optimize constants with memoization
  const bubbleSize = 50;
  const offset = bubbleSize / 2;
  
  // Create signals for mouse position to optimize reactivity
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = createSignal(false);
  
  // Memoize computed styles to prevent unnecessary recalculations
  const bubbleStyle = createMemo(() => ({
    position: 'absolute' as const,
    width: `${bubbleSize}px`,
    height: `${bubbleSize}px`,
    transform: `translate(${mousePos().x - offset}px, ${mousePos().y - offset}px)`,
    background: 'radial-gradient(circle at center, rgba(46, 133, 64, 0.8) 0, rgba(46, 133, 64, 0) 70%)',
    'border-radius': '50%',
    opacity: isHovered() ? 1 : 0,
    transition: 'opacity 0.3s ease',
    'z-index': 100,
    'mix-blend-mode': 'hard-light' as const,
    filter: 'blur(15px)'
  }));

  onMount(() => {
    if (!elementRef) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let animationId: number | null = null;
    let isAnimating = false;

    // Optimized animation loop with reduced calculations
    function move() {
      if (!isAnimating) return;
      
      const deltaX = (tgX - curX) / 25;
      const deltaY = (tgY - curY) / 25;
      
      // Only update if movement is significant (performance optimization)
      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        curX += deltaX;
        curY += deltaY;
        setMousePos({ x: Math.round(curX), y: Math.round(curY) });
      }
      
      animationId = requestAnimationFrame(move);
    }

    // Throttled mouse move handler for better performance
    let mouseMoveTimeout: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef) return;
      
      // Throttle mouse move events
      if (mouseMoveTimeout) return;
      
      mouseMoveTimeout = window.setTimeout(() => {
        const rect = elementRef.getBoundingClientRect();
        tgX = e.clientX - rect.left;
        tgY = e.clientY - rect.top;
        mouseMoveTimeout = null;
      }, 16); // ~60fps throttling
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      isAnimating = true;
      move();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    // Use passive listeners for better performance
    elementRef.addEventListener('mousemove', handleMouseMove, { passive: true });
    elementRef.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    elementRef.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    onCleanup(() => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
      if (elementRef) {
        elementRef.removeEventListener('mousemove', handleMouseMove);
        elementRef.removeEventListener('mouseenter', handleMouseEnter);
        elementRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    });
  });

  const Component = props.as || 'div';
  const { children, class: className = '', as, size = 'large', backgroundStyle = 'minimal', ...otherProps } = props;

  return (
    <Component
      ref={elementRef}
      class={`${className} interactive-element-${backgroundStyle} relative overflow-hidden`}
      {...otherProps}
    >
      {/* SVG Filter for Interactive Background */}
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="goo-interactive">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Full gradient background with all blobs (like signin page) */}
      {backgroundStyle === 'full' && (
        <>
          <div class="absolute inset-0 bg-gradient-to-r from-oasis-green to-desert-sand"></div>
          <div class="absolute inset-0" style={{ filter: "url(#goo-interactive) blur(40px)" }}>
            <div class="interactive-g1-full"></div>
            <div class="interactive-g2-full"></div>
            <div class="interactive-g3-full"></div>
            <div class="interactive-g4-full"></div>
            <div class="interactive-g5-full"></div>
          </div>
        </>
      )}

      {/* Minimal gradient background */}
      {backgroundStyle === 'minimal' && (
        <div class={`absolute inset-0`} style={{ filter: "url(#goo-interactive) blur(20px)" }}>
          <div class={`interactive-g1-${size}`}></div>
          <div class={`interactive-g2-${size}`}></div>
          <div class={`interactive-g3-${size}`}></div>
          <div class={`interactive-g4-${size}`}></div>
          <div class={`interactive-g5-${size}`}></div>
        </div>
      )}
      
      {/* Interactive bubble - always small for buttons */}
      <div
        ref={bubbleRef}
        style={bubbleStyle()}
      />
      
      <div class="relative z-10">
        {children}
      </div>
    </Component>
  );
};