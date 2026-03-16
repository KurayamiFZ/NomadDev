"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  title: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  variant?: "free" | "basic" | "premium";
  recommended?: boolean;
  onSelect?: () => void;
  buttonText?: string;
  children?: ReactNode;
  className?: string;
}

export function PlanCard({
  title,
  price,
  priceSubtext = "/ month",
  features,
  variant = "basic",
  recommended = false,
  onSelect,
  buttonText = "Get started",
  children,
  className,
}: PlanCardProps) {
  const isPremium = variant === "premium";
  const isFree = variant === "free";

  return (
    <div
      className={cn(
        "plan-card group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500",
        isPremium
          ? "bg-white text-black shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_32px_64px_-12px_rgba(0,0,0,0.25)]"
          : "bg-[#0a0a0a] text-white border border-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_-8px_rgba(0,0,0,0.5)]",
        "hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_80px_-16px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Premium shimmer bar */}
      {isPremium && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-black to-transparent" />
      )}

      {/* Recommended pill */}
      {recommended && (
        <div className={cn(
          "absolute top-5 right-5 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full",
          isPremium
            ? "bg-black text-white"
            : "bg-white/10 text-white/80 border border-white/10"
        )}>
          Best value
        </div>
      )}

      <div className="flex flex-col flex-1 p-8 gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <span className={cn(
            "text-xs font-semibold tracking-[0.2em] uppercase",
            isPremium ? "text-black/40" : "text-white/30"
          )}>
            {title}
          </span>

          <div className="flex items-end gap-1.5">
            <span className={cn(
              "text-5xl font-black tracking-tight leading-none",
              isPremium ? "text-black" : "text-white"
            )}>
              {price}
            </span>
            <span className={cn(
              "text-sm font-medium mb-1.5",
              isPremium ? "text-black/40" : "text-white/30"
            )}>
              {priceSubtext}
            </span>
          </div>

          {/* Divider */}
          <div className={cn(
            "h-px w-full mt-1",
            isPremium ? "bg-black/8" : "bg-white/6"
          )} />
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {features.map((feature, index) => {
            const isDisabled = feature.includes("✖");
            const label = feature.replace("✖", "").replace("✔", "").trim();
            const hasCheck = feature.includes("✔") || !isDisabled;

            return (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-3 text-sm font-medium",
                  isDisabled
                    ? isPremium ? "text-black/25" : "text-white/20"
                    : isPremium ? "text-black/80" : "text-white/75"
                )}
              >
                <span className={cn(
                  "shrink-0 w-4 h-4 rounded-full flex items-center justify-center",
                  isDisabled
                    ? isPremium ? "bg-black/5" : "bg-white/5"
                    : isPremium ? "bg-black/8" : "bg-white/8"
                )}>
                  {isDisabled ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        {children}

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={cn(
            "relative w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden",
            "active:scale-[0.98]",
            isPremium
              ? "bg-black text-white hover:bg-black/85"
              : isFree
              ? "bg-white/5 text-white/60 border border-white/8 hover:bg-white/10 hover:text-white/80"
              : "bg-white text-black hover:bg-white/90"
          )}
        >
          {/* Subtle sheen on hover */}
          <span className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full",
            "transition-transform duration-700"
          )} />
          <span className="relative z-10">{buttonText}</span>
        </button>
      </div>
    </div>
  );
}