import { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, duration = 1500, decimals = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const target = parseFloat(end);
    if (isNaN(target)) return;

    startTime.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}
