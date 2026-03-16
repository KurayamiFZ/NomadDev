"use client";

import { PlanCard } from "../components/ui/PlanCard";
import { NavigationLink } from "../components/ui/NavigationLink";
import { Heading } from "../components/ui/Heading";
import { FlexRow } from "../components/ui/FlexRow";
import { GradientBackground } from "../components/ui/GradientBackground";

export default function Curriculum() {
  const freeFeatures = [
    "✔ Benefits",
    "✔ Benefits", 
    "✔ Benefits",
    "✔ Benefits",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit"
  ];
  
  const basicFeatures = [
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits", 
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✖ Benefit",
    "✖ Benefit",
    "✖ Benefit"
  ];
  
  const premiumFeatures = [
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits",
    "✔ Benefits"
  ];

  return (
    <div className="flex flex-col justify-center min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(41,19,60,1),rgba(255,255,255,0))] bg-fixed items-center">
      <FlexRow className="w-full h-1/12" justify="between">
        <NavigationLink 
          to="/" 
          className="self-center m-4 h-10 w-30 font-bold bg-black/50 hover:bg-stone-300 rounded-full text-white border-2 border-white"
        >
          ⟵ Back
        </NavigationLink>
        
        <GradientBackground 
          variant="purple-pink" 
          direction="to-r"
          className="bg-[linear-gradient(to_right,#A95BF0,#E94D9B)] bg-clip-text text-transparent font-extrabold font-[Inter] text-6xl mb-8 p-4"
        >
          Plans
        </GradientBackground>
        
        <div className="bg-black w-1/12 h-full"></div>
      </FlexRow>

      <div className="flex w-3/4 h-200 rounded-4xl bg-black/50 border-2 border-white">
        <PlanCard
          title="Free"
          price="$0"
          features={freeFeatures}
          variant="free"
          buttonText="View Curriculum"
          onSelect={() => {/* Handle free plan selection */}}
        />
        
        <PlanCard
          title="Basic"
          price="$99"
          features={basicFeatures}
          variant="basic"
          buttonText="View Curriculum"
          onSelect={() => {/* Handle basic plan selection */}}
        />
        
        <PlanCard
          title="Premium"
          price="$299"
          features={premiumFeatures}
          variant="premium"
          buttonText="View Curriculum"
          onSelect={() => {/* Handle premium plan selection */}}
        />
      </div>
    </div>
  );
}
