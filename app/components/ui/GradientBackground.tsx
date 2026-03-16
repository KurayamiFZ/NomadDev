"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientVariant =
  | "purple-pink"
  | "blue-cyan"
  | "yellow-orange"
  | "green-emerald"
  | "red-rose";

type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-b"
  | "to-t"
  | "to-br"
  | "to-bl"
  | "to-tr"
  | "to-tl";

interface GradientBackgroundProps {
  children?: ReactNode;
  variant?: GradientVariant;
  direction?: GradientDirection;
  overlay?: "dark" | "light" | "none";
  animated?: boolean;
  className?: string;
}

const gradientConfig = {
  "purple-pink": "from-purple-500 to-pink-500",
  "blue-cyan": "from-blue-500 to-cyan-500",
  "yellow-orange": "from-yellow-500 to-orange-500",
  "green-emerald": "from-green-500 to-emerald-500",
  "red-rose": "from-red-500 to-rose-500"
};

const directionConfig = {
  "to-r": "bg-gradient-to-r",
  "to-l": "bg-gradient-to-l",
  "to-b": "bg-gradient-to-b",
  "to-t": "bg-gradient-to-t",
  "to-br": "bg-gradient-to-br",
  "to-bl": "bg-gradient-to-bl",
  "to-tr": "bg-gradient-to-tr",
  "to-tl": "bg-gradient-to-tl"
};

const overlayClasses = {
  dark: "bg-black/60",
  light: "bg-white/10",
  none: ""
};

export function GradientBackground({
  children,
  variant = "purple-pink",
  direction = "to-br",
  animated = false,
  className,
  overlay = "none"
}: GradientBackgroundProps) {

  const baseClasses = cn(
    directionConfig[direction],
    gradientConfig[variant],
    animated && "animate-gradient",
    className
  );

  if (!children) {
    return <div className={baseClasses} />;
  }

  return (
    <div className={cn("relative", baseClasses)}>
      {overlay !== "none" && (
        <div className={cn("absolute inset-0 pointer-events-none", overlayClasses[overlay])} />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}