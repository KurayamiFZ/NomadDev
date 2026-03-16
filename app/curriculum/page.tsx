"use client";
import { PlanCard } from "../components/ui/PlanCard";
import { NavigationLink } from "../components/ui/NavigationLink";

export default function Curriculum() {
  const freeFeatures = [
    "✔ Benefits", "✔ Benefits", "✔ Benefits", "✔ Benefits",
    "✖ Benefit", "✖ Benefit", "✖ Benefit", "✖ Benefit",
    "✖ Benefit", "✖ Benefit", "✖ Benefit", "✖ Benefit"
  ];

  const basicFeatures = [
    "✔ Benefits", "✔ Benefits", "✔ Benefits", "✔ Benefits",
    "✔ Benefits", "✔ Benefits", "✔ Benefits",
    "✖ Benefit", "✖ Benefit", "✖ Benefit", "✖ Benefit",  "✖ Benefit"
  ];

  const premiumFeatures = Array(12).fill("✔ Benefits");

  return (
    <div className="relative flex flex-col min-h-screen w-screen bg-[#080808] overflow-x-hidden">

      {/* Ambient background glow — top center */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(180,140,255,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between w-full px-8 h-16 border-b border-white/5">
        <NavigationLink
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </NavigationLink>

        {/* Centered wordmark */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.18em] uppercase text-white/20">
          Curriculum
        </span>

        {/* Spacer */}
        <div className="w-16" />
      </header>

      {/* Hero heading */}
      <div className="relative z-10 flex flex-col items-center text-center pt-16 pb-12 px-4 gap-4">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/25">
          Simple pricing
        </p>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
          Choose your plan
        </h1>
        <p className="text-base text-white/35 font-medium max-w-md">
          Start free, upgrade when you're ready. No hidden fees.
        </p>
      </div>

      {/* Cards grid */}
      <main className="relative z-10 flex flex-col items-center px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl items-stretch">

          {/* Free — slightly inset vertically to let Basic/Premium feel elevated */}
          <div className="md:pt-6">
            <NavigationLink to="/login" className="w-full">
              <PlanCard
                title="Free"
                price="$0"
                priceSubtext="forever"
                features={freeFeatures}
                variant="free"
                onSelect={() => {}}
                className="h-full w-full"
              />
            </NavigationLink>
          </div>

          {/* Basic — center, tallest */}
          <PlanCard
            title="Basic"
            price="$99"
            features={basicFeatures}
            variant="basic"
            buttonText="Get started"
            onSelect={() => {}}
            className="h-full"
          />

          {/* Premium — white card, most prominent */}
          <PlanCard
            title="Premium"
            price="$299"
            features={premiumFeatures}
            variant="premium"
            recommended={true}
            buttonText="Go premium"
            onSelect={() => {}}
            className="h-full"
          />
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-white/20 font-medium tracking-wide">
          All plans include a 14-day money-back guarantee.
        </p>
      </main>
    </div>
  );
}