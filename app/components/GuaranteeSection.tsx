import { Shield, CheckCircle } from "lucide-react";
import { GUARANTEES, type Guarantee } from "@/lib/constants";

export function GuaranteeSection() {
  return (
    <section className="mx-4 mb-8 md:mt-8 flex w-[calc(100%-2rem)] max-w-xl flex-col items-center rounded-2xl border-2 border-emerald-500 bg-linear-to-b from-secondary to-black p-6 sm:mx-6 sm:w-[calc(100%-3rem)] sm:rounded-3xl sm:p-8">
      <Shield className="h-10 w-10 text-emerald-400 sm:h-12 sm:w-12" />

      <h3 className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">
        Бидний танд өгөх баталгаа
      </h3>

      <div className="mt-6 flex w-full flex-col gap-4 sm:mt-8 sm:gap-6">
        {GUARANTEES.map((g: Guarantee) => (
          <div key={g.title} className="flex items-start gap-3 sm:gap-4">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400 sm:h-5 sm:w-5" />
            <div>
              <span className="text-sm font-bold text-foreground sm:text-base">
                {g.title}
              </span>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {g.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm font-bold text-emerald-400 sm:mt-6 sm:text-base">
        Ямар ч эрсдэлгүй, бүх шагнал чинь
      </p>
    </section>
  );
}
