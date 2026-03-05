"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import Icon from "./icons";

export function CTASection() {
  const router = useRouter();

  return (
    <div className="m-8 w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 p-px sm:mx-6 sm:rounded-3xl">
      <section
        id="pricing"
        className="flex w-full flex-col items-center gap-5 rounded-2xl bg-black/60 p-6 text-center sm:gap-6 sm:rounded-3xl sm:p-8 lg:gap-8 lg:p-12"
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-5xl">
          Ready to Start Your Journey?
        </h2>

        <p className="max-w-xl text-sm text-foreground/80 sm:text-base lg:text-lg">
          Join 15,000+ developers who transformed their careers. Start building
          real games today.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="w-full bg-foreground text-purple-900 hover:bg-foreground/90 sm:w-auto"
            onClick={() => router.push("/curriculum")}
          >
            Enroll Now - $299
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full border-foreground/50 bg-transparent text-foreground hover:bg-foreground/10 sm:w-auto"
            onClick={() => router.push("/curriculum")}
          >
            View Full Curriculum
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/80 sm:gap-4 sm:text-sm">
          <span className="flex items-center gap-1">
            <Icon name="CheckCircle" className="h-3 w-3 sm:h-4 sm:w-4" /> 30-Day
            Money Back
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" className="h-3 w-3 sm:h-4 sm:w-4" /> Lifetime
            Access
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Target" className="h-3 w-3 sm:h-4 sm:w-4" /> Job
            Guarantee
          </span>
        </div>

        <p className="text-xs font-bold text-amber-300 sm:text-sm">
          Next cohort starts February 1st – Only 8 spots remaining
        </p>
      </section>
    </div>
  );
}
