// AnimatedNumber.tsx
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";


export default function AnimatedNumber({
  value,
  duration = 1,
  appendChars = "",
  format = (n) => Math.floor(n).toString(),
}) {
  const motionValue = useMotionValue(0);

  // Optional: useTransform to format the number on the fly
  const transformed = useTransform(motionValue, (latest) => format(latest));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Start animation on mount or when value changes and element is in view
  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeInOut",
        delay: 0.25
      });
      return controls.stop; // clean up on unmount
    }
  }, [value, duration, isInView]);

  return <motion.span ref={ref}>{transformed}</motion.span>;
}
