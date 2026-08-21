import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMs } from "@/lib/format";
import type { Phase } from "@/lib/timer-store";

const SIZE = 288;
const STROKE = 3.5;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = (SIZE - STROKE * 2 - 18) / 2;
const CIRC = Math.round(2 * Math.PI * R * 100) / 100;

function q(n: number) {
  return Math.round(n * 100) / 100;
}

const TICKS = Array.from({ length: 60 }, (_, i) => {
  const major = i % 5 === 0;
  const angle = (i / 60) * Math.PI * 2;
  const inner = R + (major ? 6 : 10);
  const outer = R + 14;
  return {
    i,
    major,
    x1: q(CX + Math.cos(angle) * inner),
    y1: q(CY + Math.sin(angle) * inner),
    x2: q(CX + Math.cos(angle) * outer),
    y2: q(CY + Math.sin(angle) * outer),
  };
});

type TimerRingProps = {
  remainingMs: number;
  durationMs: number;
  phase: Phase;
  label: string;
};

export function TimerRing({ remainingMs, durationMs, phase, label }: TimerRingProps) {
  const progress =
    phase === "holding"
      ? 0
      : durationMs <= 0
        ? 1
        : Math.min(1, Math.max(0, remainingMs / durationMs));
  const offset = q(CIRC * (1 - progress));
  const display =
    phase === "holding" ? null : formatMs(phase === "idle" ? durationMs : remainingMs);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-72">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={CX}
          cy={CY}
          r={R + 14}
          fill="none"
          className="stroke-foreground/10"
          strokeWidth={1}
        />
        {TICKS.map((tick) => (
          <line
            key={tick.i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            className={tick.major ? "stroke-foreground/30" : "stroke-foreground/10"}
            strokeWidth={tick.major ? 1.4 : 1}
            strokeLinecap="round"
          />
        ))}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          className="stroke-foreground/10"
          strokeWidth={STROKE}
        />
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          className={cn(
            "stroke-primary",
            phase === "holding" && "stroke-primary/40",
          )}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        {phase === "holding" ? (
          <>
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" strokeWidth={2.25} />
            </span>
            <p className="font-display text-3xl font-medium tracking-tight text-foreground">
              Paused
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Music is off</p>
          </>
        ) : (
          <>
            <p
              className="font-display text-timer font-medium text-foreground tabular-nums"
              aria-live="polite"
            >
              {display}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
          </>
        )}
      </div>
    </div>
  );
}
