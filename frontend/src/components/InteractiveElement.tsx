import { useRef, useEffect } from 'react';

interface InteractiveElementProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'div';
  size?: 'small' | 'large';
  backgroundStyle?: 'full' | 'minimal';
  [key: string]: any;
}

export function InteractiveElement({
  children,
  className = '',
  as = 'div',
  size = 'large',
  backgroundStyle = 'minimal',
  ...props
}: InteractiveElementProps) {
  const elementRef = useRef<any>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Always use small bubble size for mouse tracking
  const bubbleSize = 50;
  const offset = bubbleSize / 2;

  useEffect(() => {
    const element = elementRef.current;
    const bubble = bubbleRef.current;
    if (!element || !bubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 25; // Slightly slower for button
      curY += (tgY - curY) / 25;
      bubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      tgX = e.clientX - rect.left - offset;
      tgY = e.clientY - rect.top - offset;
    };

    const handleMouseEnter = () => {
      bubble.style.opacity = '1';
      move();
    };

    const handleMouseLeave = () => {
      bubble.style.opacity = '0';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [offset]);

  const Component = as;

  return (
    <Component
      ref={elementRef}
      className={`${className} interactive-element-${backgroundStyle} relative overflow-hidden`}
      {...props}
    >
      {/* Full gradient background with all blobs (like signin page) */}
      {backgroundStyle === 'full' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-oasis-green to-desert-sand"></div>
          <div className="absolute inset-0 interactive-gradient-container-full">
            <div className="interactive-g1-full"></div>
            <div className="interactive-g2-full"></div>
            <div className="interactive-g3-full"></div>
            <div className="interactive-g4-full"></div>
            <div className="interactive-g5-full"></div>
          </div>
        </>
      )}

      {/* Minimal gradient background */}
      {backgroundStyle === 'minimal' && (
        <div className={`absolute inset-0 interactive-gradient-container-${size}`}>
          <div className={`interactive-g1-${size}`}></div>
          <div className={`interactive-g2-${size}`}></div>
          <div className={`interactive-g3-${size}`}></div>
          <div className={`interactive-g4-${size}`}></div>
          <div className={`interactive-g5-${size}`}></div>
        </div>
      )}
      
      {/* Interactive bubble - always small for buttons */}
      <div
        ref={bubbleRef}
        style={{
          position: 'absolute',
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          transform: `translate(-${offset}px, -${offset}px)`,
          background: 'radial-gradient(circle at center, rgba(46, 133, 64, 0.8) 0, rgba(46, 133, 64, 0) 70%)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 100,
          mixBlendMode: 'hard-light',
          filter: 'blur(15px)'
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}
