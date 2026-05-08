import Icon from "./icons";

export function TransformationSection() {
  return (
    <div className="mx-4 rounded-2xl w-[calc(100%-2rem)] max-w-3xl bg-linear-to-r from-purple-600 to-pink-600 p-px sm:mx-6 sm:rounded-3xl lg:mx-auto">
      <section className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl bg-black/60 p-6 text-center sm:gap-6 sm:rounded-3xl sm:p-8 lg:p-12 md:items-center md:justify-between md:text-center">
        <Icon
          name="Sparkles"
          className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        />

        <div>
          <span className="text-sm font-bold text-foreground/80 sm:text-base">
            1-р долоо хоног
          </span>
          <p className="text-lg font-bold text-foreground sm:text-xl">
            Бүрэн эхлэгч
          </p>
          <p className="text-xs text-foreground/60 sm:text-sm">
            Кодчлолын туршлагагүй
          </p>
        </div>

        <Icon
          name="ArrowRight"
          className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0 md:hidden"
        />

        <div className="rounded-full bg-amber-400/20 px-3 py-1.5 sm:px-4 sm:py-2">
          <span className="text-sm font-bold text-amber-300 sm:text-base">
            Суралцах аялал
          </span>
          <p className="text-[10px] text-foreground/80 sm:text-xs">
            Интерактив хичээл — Практик төслүүд
          </p>
        </div>

        <Icon
          name="ArrowRight"
          className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0 md:hidden"
        />

        <div className="flex flex-col justify-center items-center md:text-center">
          <Icon
            name="Rocket"
            className="mx-auto h-8 w-8 text-foreground sm:h-10 sm:w-10 lg:h-12 lg:w-12 md:mx-0"
          />
          <span className="text-sm font-bold text-foreground/80 sm:text-base">
            12-р долоо хоног
          </span>
          <p className="text-lg font-bold text-foreground sm:text-xl">
            Тоглоом гаргасан хөгжүүлэгч
          </p>
          <p className="text-xs text-foreground/60 sm:text-sm">
            Арилжааны тоглоом бүтээгдсэн
          </p>
        </div>
      </section>
    </div>
  );
}
