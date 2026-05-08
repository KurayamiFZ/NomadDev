import { CheckCircle } from "lucide-react";
import { ROADMAP_PHASES, type RoadmapPhase } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="flex w-full max-w-5xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
    >
      <h2 className="text-center text-2xl font-extrabold text-foreground sm:text-3xl lg:text-4xl">
        Амжилтад хүрэх тодорхой зам
      </h2>

      <div className="mt-8 flex w-full flex-col gap-6 sm:mt-12 sm:gap-8 lg:mt-16 lg:gap-12">
        {ROADMAP_PHASES.map((phase: RoadmapPhase, index: number) => (
          <div
            key={phase.title}
            className="flex items-start gap-3 sm:gap-4 lg:gap-6"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br sm:h-12 sm:w-12 lg:h-16 lg:w-16 ${phase.gradient}`}
            >
              <span className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                {index + 1}
              </span>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl bg-linear-to-r from-secondary/80 to-black">
              <div className="p-4 sm:p-6 lg:p-8">
                <span
                  className={`bg-linear-to-r ${phase.gradient} bg-clip-text text-xs font-bold text-transparent sm:text-sm`}
                >
                  {phase.weeks}
                </span>
                <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl lg:text-3xl">
                  {phase.title}
                </h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {phase.subtitle}
                </p>

                <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-border bg-black/50 p-2 sm:gap-3 sm:rounded-xl sm:p-3"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-purple-400 sm:h-5 sm:w-5" />
                      <span className="text-xs text-foreground sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
