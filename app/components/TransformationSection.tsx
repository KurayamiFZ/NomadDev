import Icon from "./icons";

export function TransformationSection() {
  return (
    <div className="mx-4 rounded-2xl w-[calc(100%-2rem)] max-w-3xl bg-linear-to-r from-purple-600 to-pink-600 p-px sm:mx-6 sm:rounded-3xl lg:mx-auto">
      <section className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl bg-black/60 p-6 text-center sm:gap-6 sm:rounded-3xl sm:p-8 lg:p-12 md:flex-row md:items-center md:justify-between md:text-left">
        <Icon
          name="Sparkles"
          className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        />

        <div>
          <span className="text-sm font-bold text-foreground/80 sm:text-base">
            Week 1
          </span>
          <p className="text-lg font-bold text-foreground sm:text-xl">
            Complete Beginner
          </p>
          <p className="text-xs text-foreground/60 sm:text-sm">
            No coding experience
          </p>
        </div>

        <Icon
          name="ArrowRight"
          className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0 md:hidden"
        />

        <div className="rounded-full bg-amber-400/20 px-3 py-1.5 sm:px-4 sm:py-2">
          <span className="text-sm font-bold text-amber-300 sm:text-base">
            12 Week Transformation
          </span>
          <p className="text-[10px] text-foreground/80 sm:text-xs">
            150+ Lessons | 5 Complete Games
          </p>
        </div>

        <Icon
          name="ArrowRight"
          className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0 md:hidden"
        />

        <div className="md:text-right">
          <Icon
            name="Rocket"
            className="mx-auto h-8 w-8 text-foreground sm:h-10 sm:w-10 lg:h-12 lg:w-12 md:mx-0 md:ml-auto"
          />
          <span className="text-sm font-bold text-foreground/80 sm:text-base">
            Week 12
          </span>
          <p className="text-lg font-bold text-foreground sm:text-xl">
            Published Game Developer
          </p>
          <p className="text-xs text-foreground/60 sm:text-sm">
            Commercial game shipped
          </p>
        </div>
      </section>
    </div>
  );
}
