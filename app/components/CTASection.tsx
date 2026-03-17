"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Heading } from "./ui/Heading";
import { GradientBackground } from "./ui/GradientBackground";
import { FlexRow } from "./ui/FlexRow";
import { IconWrapper } from "./ui/IconWrapper";
import { CheckCircle, Clock, Target } from "lucide-react";
import Icon from "./icons";

export function CTASection() {
  const router = useRouter();

  return (
    <GradientBackground
  variant="purple-pink"
  direction="to-r"
  overlay="dark"
  className="m-8 w-[calc(100%-2rem)] border-2 max-w-4xl rounded-3xl p-px overflow-hidden"
>
  <section
    id="pricing"
    className="flex w-full flex-col items-center gap-5 rounded-3xl p-6 text-center sm:gap-6 sm:p-8 lg:gap-8 lg:p-12"
  >
        <Heading size="2xl" className="sm:text-3xl lg:text-5xl">
          Ready to Start Your Journey?
        </Heading>

        <p className="max-w-xl text-sm text-foreground/80 sm:text-base lg:text-lg">
          Join 15,000+ developers who transformed their careers. Start building
          real games today.
        </p>

        <FlexRow className="w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">

          <Button
            size="lg"
            variant="outline"
            className="group w-full flex items-center gap-2 border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white sm:w-auto"
            onClick={() => router.push("/curriculum")}
          >
            View Full Curriculum
            <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </FlexRow>

        <FlexRow className="flex-wrap items-center justify-center gap-3 text-xs text-foreground/80 sm:gap-4 sm:text-sm">
          <FlexRow align="center" gap="sm">
            <IconWrapper icon={CheckCircle} size="sm" variant="transparent" color="gray" />
            30-Day Money Back
          </FlexRow>
          <FlexRow align="center" gap="sm">
            <IconWrapper icon={Clock} size="sm" variant="transparent" color="gray" />
            Lifetime Access
          </FlexRow>
          <FlexRow align="center" gap="sm">
            <IconWrapper icon={Target} size="sm" variant="transparent" color="gray" />
            Job Guarantee
          </FlexRow>
        </FlexRow>

        <p className="text-xs font-bold text-amber-300 sm:text-sm">
          Next cohort starts February 1st – Only 8 spots remaining
        </p>
      </section>
    </GradientBackground>
  );
}
