import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  /** The numerical value to animate to. */
  value: number;
  /** Optional className to be passed to the span element for styling. */
  className?: string;
}

/**
 * A component that animates a numerical value smoothly when it changes.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log(`AnimatedCounter loaded. Animating to: ${value}`);
    const node = countRef.current;
    if (!node) return;

    // Get the previous value from the node's text content.
    // Remove commas for parsing and default to 0 if it's empty.
    const fromValue = Number(node.textContent?.replace(/,/g, '')) || 0;

    // Use Framer Motion's animate function for a smooth transition.
    const controls = animate(fromValue, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate(latest) {
        if (node) {
          // Update the text content on each frame of the animation.
          // Round to the nearest integer and format with commas for readability.
          node.textContent = Math.round(latest).toLocaleString();
        }
      },
    });

    // Return a cleanup function to stop the animation if the component
    // unmounts or if the value changes again before the animation finishes.
    return () => controls.stop();
  }, [value]); // This effect re-runs whenever the 'value' prop changes.

  // The span is rendered without an initial child, allowing the useEffect
  // to control its content from the start, enabling animation on first render.
  return <span ref={countRef} className={className} />;
};

export default AnimatedCounter;