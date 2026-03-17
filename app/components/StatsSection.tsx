import { STATS, type Stat } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="grid w-full max-w-4xl grid-cols-2 gap-2 px-4 py-12 sm:gap-4 sm:px-6 sm:py-16 lg:grid-cols-4 lg:py-24">
      {STATS.map((stat: Stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center rounded-xl bg-linear-to-b from-secondary/50 to-black p-4 text-center sm:p-6"
        >
          <span className="text-2xl font-extrabold text-purple-400 sm:text-3xl">
            {stat.value}
          </span>
          <span className="mt-1 text-sm font-bold text-foreground sm:text-base">
            {stat.label}
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">
            {stat.sub}
          </span>
        </div>
      ))}
    </section>
  );
}
