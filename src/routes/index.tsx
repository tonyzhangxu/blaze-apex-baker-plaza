import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Info, Settings2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimerRing } from "@/components/timer-ring";
import { IdleControls } from "@/components/idle-controls";
import { SettingsDrawer } from "@/components/settings-drawer";
import { HowItWorks } from "@/components/how-it-works";
import { MoonMark } from "@/components/moon-mark";
import { useTimerEngine } from "@/hooks/use-timer-engine";
import { cn } from "@/lib/utils";
import { useTimer } from "@/lib/timer-store";
import {
  prepareStopper,
  startHoldingFocus,
  releaseFocus,
  requestNotificationPermission,
  getStopperError,
} from "@/lib/music-stop";
import { requestWakeLock } from "@/lib/wake-lock";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useTimerEngine();

  const phase = useTimer((s) => s.phase);
  const mode = useTimer((s) => s.mode);
  const durationMs = useTimer((s) => s.durationMs);
  const remainingMs = useTimer((s) => s.remainingMs);
  const settings = useTimer((s) => s.settings);
  const audioError = useTimer((s) => s.audioError);
  const setDurationMin = useTimer((s) => s.setDurationMin);
  const setMode = useTimer((s) => s.setMode);
  const patchSettings = useTimer((s) => s.patchSettings);
  const start = useTimer((s) => s.start);
  const pause = useTimer((s) => s.pause);
  const resume = useTimer((s) => s.resume);
  const addMinutes = useTimer((s) => s.addMinutes);
  const cancel = useTimer((s) => s.cancel);
  const hold = useTimer((s) => s.hold);
  const finish = useTimer((s) => s.finish);
  const setAudioReady = useTimer((s) => s.setAudioReady);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [hiddenWarn, setHiddenWarn] = useState(false);

  const durationMin = Math.round(durationMs / 60_000);

  useEffect(() => {
    void useTimer.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (phase !== "running" || !settings.dimScreen) {
      setDimmed(false);
      return;
    }
    let t = window.setTimeout(() => setDimmed(true), 8000);
    const bump = () => {
      setDimmed(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setDimmed(true), 8000);
    };
    window.addEventListener("pointerdown", bump);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", bump);
    };
  }, [phase, settings.dimScreen]);

  useEffect(() => {
    const onVis = () => {
      setHiddenWarn(
        document.visibilityState === "hidden" &&
          useTimer.getState().phase === "running",
      );
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  async function onStart() {
    const ok = await prepareStopper();
    setAudioReady(ok, ok ? null : getStopperError());
    void requestNotificationPermission();
    if (settings.keepAwake) void requestWakeLock();
    start();
  }

  async function onPauseNow() {
    const ok = await prepareStopper();
    setAudioReady(ok, ok ? null : getStopperError());
    const held = await startHoldingFocus();
    if (!held) setAudioReady(false, getStopperError());
    hold();
  }

  function onFinish() {
    releaseFocus();
    finish();
  }

  const ringLabel =
    phase === "running"
      ? "until music pauses"
      : phase === "paused"
        ? "timer paused"
        : phase === "holding"
          ? settings.holdPause
            ? "holding audio focus"
            : "music paused"
          : "then music pauses";

  return (
    <main
      className={cn(
        "relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
        dimmed && "cursor-none",
      )}
    >
      <header
        className={cn(
          "night-dim flex items-center justify-between",
          dimmed ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
            <MoonMark className="size-4" />
          </span>
          <div>
            <p className="font-display text-lg font-medium leading-none tracking-tight">
              Hush
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Sleep timer</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="How it works"
            onClick={() => setHowOpen(true)}
          >
            <Info />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings2 />
          </Button>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-6">
        <TimerRing
          remainingMs={remainingMs}
          durationMs={durationMs}
          phase={phase}
          label={ringLabel}
        />
        {hiddenWarn ? (
          <p className="mt-4 max-w-xs text-center text-sm text-muted-foreground">
            Bring Hush back to the front — Android may freeze a hidden tab.
          </p>
        ) : null}
        {audioError && phase === "holding" ? (
          <p className="mt-4 max-w-xs text-center text-sm text-muted-foreground">
            Could not take audio focus. Tap Pause now after allowing sound.
          </p>
        ) : null}
      </section>

      <section
        className={cn(
          "night-dim flex flex-col gap-4",
          dimmed ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        {phase === "idle" ? (
          <div className="stagger-in flex flex-col gap-5">
            <IdleControls
              mode={mode}
              durationMin={durationMin}
              onMode={setMode}
              onPreset={setDurationMin}
              onStep={(d) => setDurationMin(durationMin + d)}
              onUntil={setDurationMin}
            />
            <div className="flex flex-col gap-2">
              <Button type="button" size="xl" onClick={() => void onStart()}>
                Stop music in {durationMin} min
              </Button>
              <Button
                type="button"
                size="lg"
                variant="ghost"
                onClick={() => void onPauseNow()}
              >
                <VolumeX />
                Pause now
              </Button>
            </div>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Leave this screen open. Add Hush to your home screen from the
              browser menu for a full-screen Android timer.
            </p>
          </div>
        ) : null}

        {phase === "running" || phase === "paused" ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => addMinutes(5)}
              >
                +5 min
              </Button>
              {phase === "running" ? (
                <Button
                  type="button"
                  variant="muted"
                  size="lg"
                  className="flex-1"
                  onClick={pause}
                >
                  Pause timer
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="muted"
                  size="lg"
                  className="flex-1"
                  onClick={resume}
                >
                  Resume
                </Button>
              )}
            </div>
            <Button type="button" variant="ghost" size="lg" onClick={cancel}>
              Cancel
            </Button>
          </div>
        ) : null}

        {phase === "holding" ? (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-secondary px-5 py-4">
              <p className="text-sm font-medium text-foreground">
                {settings.holdPause ? "Holding audio focus" : "Pause sent"}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Apple Music, Spotify, and other Android players should now be
                paused. Keep this screen open if you want them to stay off.
              </p>
            </div>
            <Button type="button" size="xl" onClick={onFinish}>
              Done
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => {
                releaseFocus();
                finish();
              }}
            >
              Set another time
            </Button>
          </div>
        ) : null}
      </section>

      {dimmed ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-10 text-center text-xs text-muted-foreground">
          Tap to wake
        </p>
      ) : null}

      <SettingsDrawer
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onPatch={patchSettings}
      />
      <HowItWorks open={howOpen} onOpenChange={setHowOpen} />
    </main>
  );
}
