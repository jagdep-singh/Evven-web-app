"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { createContext, useContext, Children, isValidElement } from "react";

type StaggerContextValue = {
  shouldReduceMotion: boolean;
  index: number;
  total: number;
};

const StaggerContext = createContext<StaggerContextValue>({
  shouldReduceMotion: false,
  index: 0,
  total: 0,
});

type StaggerContainerProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
};

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

export function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.06,
  className,
  style,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const items = Children.toArray(children).filter(isValidElement);

  if (shouldReduceMotion) {
    return <div className={className} style={style as React.CSSProperties}>{children}</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ delay, stagger }}
      className={className}
      style={style}
    >
      {Children.map(items, (child, i) => (
        <StaggerContext.Provider
          value={{ shouldReduceMotion, index: i, total: items.length }}
        >
          {child}
        </StaggerContext.Provider>
      ))}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  variant?: "fade" | "slide-up" | "slide-left" | "scale";
};

const itemVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  },
};

export function StaggerItem({
  children,
  variant = "slide-up",
  className,
  style,
}: StaggerItemProps) {
  const { shouldReduceMotion } = useContext(StaggerContext);

  if (shouldReduceMotion === true) {
    return <div className={className} style={style as React.CSSProperties}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants[variant]} className={className} style={style}>
      {children}
    </motion.div>
  );
}
