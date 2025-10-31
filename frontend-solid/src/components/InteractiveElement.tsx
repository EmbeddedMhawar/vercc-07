import { Component, onMount, onCleanup, JSX } from 'solid-js';

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

  // Always use small bubble size for mouse tracking
  const bubbleSize = 50;
  const offset = bubbleSize / 2;

  onMount(() => {
    const element = elementRef;
    const bubble = bubbleRef;
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

    onCleanup(() => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
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
      {/* Full gradient background with all blobs (like signin page) */}
      {backgroundStyle === 'full' && (
        <>
          <div class="absolute inset-0 bg-gradient-to-r from-oasis-green to-desert-sand"></div>
          <div class="absolute inset-0 interactive-gradient-container-full">
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
        <div class={`absolute inset-0 interactive-gradient-container-${size}`}>
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
        style={{
          position: 'absolute',
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          transform: `translate(-${offset}px, -${offset}px)`,
          background: 'radial-gradient(circle at center, rgba(46, 133, 64, 0.8) 0, rgba(46, 133, 64, 0) 70%)',
          'border-radius': '50%',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          'z-index': 100,
          'mix-blend-mode': 'hard-light',
          filter: 'blur(15px)'
        }}
      />
      
      <div class="relative z-10">
        {children}
      </div>
    </Component>
  );
};