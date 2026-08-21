import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatClock, upcomingStops } from "@/lib/format";
import { PRESETS_MIN, type Mode } from "@/lib/timer-store";

type IdleControlsProps = {
  mode: Mode;
  durationMin: number;
  onMode: (mode: Mode) => void;
  onPreset: (min: number) => void;
  onStep: (delta: number) => void;
  onUntil: (min: number) => void;
};

export function IdleControls({
  mode,
  durationMin,
  onMode,
  onPreset,
  onStep,
  onUntil,
}: IdleControlsProps) {
  const [untils, setUntils] = useState<Date[]>([]);

  useEffect(() => {
    if (mode !== "until") return;
    setUntils(upcomingStops(8));
  }, [mode]);

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="Timer mode"
        className="mx-auto grid w-full max-w-xs grid-cols-2 rounded-xl bg-muted p-1"
      >
        {(
          [
            ["duration", "Timer"],
            ["until", "Until"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={cn(
              "h-10 rounded-lg text-sm font-medium transition-[background-color,color] duration-150 ease-out",
              mode === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "duration" ? (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS_MIN.map((min) => {
              const active = durationMin === min;
              return (
                <Button
                  key={min}
                  type="button"
                  size="chip"
                  variant={active ? "default" : "outline"}
                  aria-pressed={active}
                  onClick={() => onPreset(min)}
                >
                  {min}m
                </Button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Minus five minutes"
              onClick={() => onStep(-5)}
            >
              <Minus />
            </Button>
            <p className="min-w-24 text-center text-sm text-muted-foreground">
              {durationMin} min
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Plus five minutes"
              onClick={() => onStep(5)}
            >
              <Plus />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {untils.map((d) => {
            const min = Math.max(1, Math.round((d.getTime() - Date.now()) / 60_000));
            const active = durationMin === min;
            return (
              <Button
                key={d.toISOString()}
                type="button"
                size="chip"
                variant={active ? "default" : "outline"}
                aria-pressed={active}
                onClick={() => onUntil(min)}
              >
                {formatClock(d)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
