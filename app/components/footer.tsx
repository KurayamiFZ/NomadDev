import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-black/50 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-pink-500 sm:h-8 sm:w-8">
            <Gamepad2 className="h-3.5 w-3.5 text-foreground sm:h-4 sm:w-4" />
          </div>
          <span className="text-sm font-bold text-foreground sm:text-base">
            GameDev Academy
          </span>
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          2026 GameDev Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
