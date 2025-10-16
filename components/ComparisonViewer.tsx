
import React, { useState, useRef, useEffect } from 'react';

interface ComparisonViewerProps {
  original: string;
  restored: string;
}

const ComparisonViewer: React.FC<ComparisonViewerProps> = ({ original, restored }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;
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

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] rounded-lg overflow-hidden select-none shadow-2xl bg-gray-900 cursor-e-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img
        src={restored}
        alt="Restored"
        className="absolute inset-0 w-full h-full object-contain"
        draggable="false"
      />
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={original}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain"
          draggable="false"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400/80 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
       <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">ORIGINAL</div>
       <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">RESTORED</div>
    </div>
  );
};

export default ComparisonViewer;
