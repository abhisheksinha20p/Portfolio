import { useState, useCallback, useEffect } from 'react';

interface UseResizableProps {
  initialSize: number;
  minSize: number;
  maxSize: number;
  direction: 'horizontal' | 'vertical';
  reverse?: boolean;
}

export const useResizable = ({
  initialSize,
  minSize,
  maxSize,
  direction,
  reverse = false,
}: UseResizableProps) => {
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      let newSize: number;
      if (direction === 'horizontal') {
        newSize = reverse ? window.innerWidth - e.clientX : e.clientX;
        // Adjust for sidebar offset if not reverse (this usually needs specific app logic, 
        // but since Sidebar is leftmost, reverse is more for right panels like AI).
        // If we want actual width from the left edge of the sidebar (which is after activity bar).
        // Let's keep it simple for now, but reverse = true is for AI panel (right).
        if (!reverse) {
          // If sidebar, it starts after activity bar (64px)
          newSize = e.clientX - 64; 
        }
      } else {
        newSize = reverse ? window.innerHeight - e.clientY : e.clientY;
      }

      if (newSize >= minSize && newSize <= maxSize) {
        setSize(newSize);
      }
    },
    [isResizing, direction, reverse, minSize, maxSize]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, direction]);

  return {
    width: direction === 'horizontal' ? size : undefined,
    height: direction === 'vertical' ? size : undefined,
    handleMouseDown,
  };
};
