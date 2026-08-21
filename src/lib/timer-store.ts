import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PRESETS_MIN = [15, 30, 45, 60, 90] as const;
export const MIN_MINUTES = 1;
export const MAX_MINUTES = 180;

export type Phase = "idle" | "running" | "paused" | "holding";
export type Mode = "duration" | "until";

export type Settings = {
  keepAwake: boolean;
  vibrate: boolean;
  holdPause: boolean;
  endChime: boolean;
  dimScreen: boolean;
};

const defaultSettings: Settings = {
  keepAwake: true,
  vibrate: true,
  holdPause: true,
  endChime: false,
  dimScreen: true,
};

type TimerState = {
  durationMs: number;
  remainingMs: number;
  endsAt: number | null;
  phase: Phase;
  mode: Mode;
  lastPresetMin: number;
  settings: Settings;
  audioReady: boolean;
  audioError: string | null;
  setDurationMin: (min: number) => void;
  setMode: (mode: Mode) => void;
  patchSettings: (patch: Partial<Settings>) => void;
  setAudioReady: (ready: boolean, error?: string | null) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  addMinutes: (min: number) => void;
  cancel: () => void;
  hold: () => void;
  finish: () => void;
  tick: () => void;
};

function clampMin(min: number) {
  return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, Math.round(min)));
}

export const useTimer = create<TimerState>()(
  persist(
    (set, get) => ({
      durationMs: 30 * 60_000,
      remainingMs: 30 * 60_000,
      endsAt: null,
      phase: "idle",
      mode: "duration",
      lastPresetMin: 30,
      settings: defaultSettings,
      audioReady: false,
      audioError: null,

      setDurationMin: (min) => {
        const minutes = clampMin(min);
        const ms = minutes * 60_000;
        const { phase } = get();
        if (phase === "running" || phase === "holding") return;
        set({
          durationMs: ms,
          remainingMs: ms,
          lastPresetMin: minutes,
          phase: "idle",
        });
      },

      setMode: (mode) => {
        if (get().phase === "running" || get().phase === "holding") return;
        set({ mode });
      },

      patchSettings: (patch) => {
        set({ settings: { ...get().settings, ...patch } });
      },

      setAudioReady: (ready, error = null) => {
        set({ audioReady: ready, audioError: error });
      },

      start: () => {
        const { remainingMs, durationMs, phase } = get();
        if (phase === "holding") return;
        const ms = phase === "paused" ? remainingMs : durationMs;
        set({
          remainingMs: ms,
          durationMs: phase === "paused" ? durationMs : ms,
          endsAt: Date.now() + ms,
          phase: "running",
        });
      },

      pause: () => {
        const { phase, endsAt } = get();
        if (phase !== "running" || !endsAt) return;
        set({
          remainingMs: Math.max(0, endsAt - Date.now()),
          endsAt: null,
          phase: "paused",
        });
      },

      resume: () => {
        const { phase, remainingMs } = get();
        if (phase !== "paused") return;
        set({
          endsAt: Date.now() + remainingMs,
          phase: "running",
        });
      },

      addMinutes: (min) => {
        const { phase, remainingMs, durationMs, endsAt } = get();
        const extra = min * 60_000;
        if (phase === "running" && endsAt) {
          const nextEnd = endsAt + extra;
          const nextRemaining = Math.max(0, nextEnd - Date.now());
          set({
            endsAt: nextEnd,
            remainingMs: nextRemaining,
            durationMs: durationMs + extra,
          });
          return;
        }
        if (phase === "idle" || phase === "paused") {
          const next = clampMin((remainingMs + extra) / 60_000) * 60_000;
          set({ remainingMs: next, durationMs: next, lastPresetMin: next / 60_000 });
        }
      },

      cancel: () => {
        const { durationMs } = get();
        set({
          phase: "idle",
          endsAt: null,
          remainingMs: durationMs,
        });
      },

      hold: () => {
        set({ phase: "holding", endsAt: null, remainingMs: 0 });
      },

      finish: () => {
        const { durationMs } = get();
        set({
          phase: "idle",
          endsAt: null,
          remainingMs: durationMs,
        });
      },

      tick: () => {
        const { phase, endsAt } = get();
        if (phase !== "running" || !endsAt) return;
        const remainingMs = Math.max(0, endsAt - Date.now());
        if (remainingMs <= 0) {
          set({
            remainingMs: 0,
            endsAt: null,
            phase: "holding",
          });
          return;
        }
        set({ remainingMs });
      },
    }),
    {
      name: "hush-timer",
      partialize: (s) => ({
        durationMs: s.durationMs,
        remainingMs: s.phase === "idle" ? s.durationMs : s.remainingMs,
        lastPresetMin: s.lastPresetMin,
        settings: s.settings,
        mode: s.mode,
      }),
      skipHydration: true,
    },
  ),
);
