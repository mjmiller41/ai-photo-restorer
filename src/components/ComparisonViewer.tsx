import React, { useState, useRef, useEffect } from 'react';

interface ComparisonViewerProps {
  original: string;
  restored: string;
}

const ChevronIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
    <path d="M9 18l6-6-6-6" transform="translate(6 0)" />
  </svg>
);

const ComparisonViewer: React.FC<ComparisonViewerProps> = ({ original, restored }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  const chipStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--paper-50)',
    background: 'rgba(42, 32, 24, 0.65)',
    backdropFilter: 'blur(6px)',
    borderRadius: 'var(--radius-pill)',
    padding: '4px 10px',
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none cursor-ew-resize"
      style={{
        aspectRatio: '4 / 3',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--ink-900)',
        boxShadow: 'var(--shadow-photo)',
      }}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Restored image (full bleed, back layer) */}
      <img
        src={restored}
        alt="Restored"
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />

      {/* Original image clipped to left of slider */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={original}
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(1) sepia(0.4) contrast(0.9)' }}
          draggable="false"
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          width: 2,
          background: 'white',
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--accent)',
            border: '2px solid white',
            boxShadow: 'var(--shadow-md)',
            color: 'white',
          }}
        >
          <ChevronIcon />
        </div>
      </div>

      {/* Chips */}
      <span className="absolute top-3 left-3" style={chipStyle}>
        Original
      </span>
      <span className="absolute top-3 right-3" style={chipStyle}>
        Restored
      </span>
    </div>
  );
};

export default ComparisonViewer;
