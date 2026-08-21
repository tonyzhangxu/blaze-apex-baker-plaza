import { useEffect, useRef } from "react";
import { useTimer } from "@/lib/timer-store";
import { formatMs } from "@/lib/format";
import {
  startHoldingFocus,
  releaseFocus,
  playChime,
  vibrateDone,
  notifyPaused,
} from "@/lib/music-stop";
import { releaseWakeLock, requestWakeLock } from "@/lib/wake-lock";

export function useTimerEngine() {
  const phase = useTimer((s) => s.phase);
  const remainingMs = useTimer((s) => s.remainingMs);
  const settings = useTimer((s) => s.settings);
  const tick = useTimer((s) => s.tick);
  const prevPhase = useRef(phase);

  useEffect(() => {
    if (phase !== "running") return;
    let raf = 0;
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const interval = window.setInterval(tick, 250);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
    };
  }, [phase, tick]);

  useEffect(() => {
    if (phase === "running" && settings.keepAwake) {
      void requestWakeLock();
    } else if (phase !== "holding") {
      void releaseWakeLock();
    }
  }, [phase, settings.keepAwake]);

  useEffect(() => {
    const enteredHold = phase === "holding" && prevPhase.current !== "holding";
    prevPhase.current = phase;
    if (!enteredHold) return;

    let cancelled = false;
    void (async () => {
      const ok = await startHoldingFocus();
      if (cancelled) return;
      if (settings.vibrate) vibrateDone();
      if (settings.endChime) void playChime();
      void notifyPaused();
      if (!settings.holdPause && ok) {
        window.setTimeout(() => {
          if (!cancelled) releaseFocus();
        }, 900);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase, settings.vibrate, settings.endChime, settings.holdPause]);

  useEffect(() => {
    if (phase === "idle") {
      releaseFocus();
      void releaseWakeLock();
    }
  }, [phase]);

  useEffect(() => {
    const base = "Hush";
    if (phase === "running") {
      document.title = `${formatMs(remainingMs)} · ${base}`;
    } else if (phase === "holding") {
      document.title = `Paused · ${base}`;
    } else {
      document.title = base;
    }
    return () => {
      document.title = base;
    };
  }, [phase, remainingMs]);

  useEffect(() => {
    const onVisible = () => {
      if (useTimer.getState().phase === "running") {
        useTimer.getState().tick();
        if (useTimer.getState().settings.keepAwake) void requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);
}
