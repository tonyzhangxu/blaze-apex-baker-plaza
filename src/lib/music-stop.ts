/**
 * Pause other Android media (Apple Music, Spotify, YouTube Music) by taking
 * audio focus. Chrome requests AUDIOFOCUS_GAIN when a page starts playback,
 * which sends AUDIOFOCUS_LOSS to the previous player — most apps pause and
 * stay paused.
 *
 * Unlocking happens on a user gesture with a *muted* element so we do not
 * interrupt music when the timer starts. Holding plays a near-silent loop
 * so focus stays with Hush until the user releases.
 */

type StopperState = "idle" | "prepared" | "holding";

let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let holdUrl: string | null = null;
let state: StopperState = "idle";
let lastError: string | null = null;

function wavHeader(view: DataView, dataBytes: number, sampleRate: number) {
  const write = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + dataBytes, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, dataBytes, true);
}

function buildHoldWav(): Blob {
  const sampleRate = 44100;
  const seconds = 2;
  const n = sampleRate * seconds;
  const buffer = new ArrayBuffer(44 + n * 2);
  const view = new DataView(buffer);
  wavHeader(view, n * 2, sampleRate);
  for (let i = 0; i < n; i++) {
    const sample = Math.sin((2 * Math.PI * 42 * i) / sampleRate) * 0.018 * 32767;
    view.setInt16(44 + i * 2, sample, true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}

function ensureAudio(): HTMLAudioElement {
  if (audio) return audio;
  holdUrl = URL.createObjectURL(buildHoldWav());
  audio = new Audio(holdUrl);
  audio.loop = true;
  audio.preload = "auto";
  audio.setAttribute("playsinline", "true");
  audio.setAttribute("webkit-playsinline", "true");
  return audio;
}

async function unlockWebAudio(): Promise<void> {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
}

function setMediaSession(holding: boolean) {
  if (!("mediaSession" in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: holding ? "Holding pause" : "Hush",
      artist: "Hush sleep timer",
      album: "Music paused",
    });
    navigator.mediaSession.playbackState = holding ? "playing" : "none";
    const noop = () => undefined;
    navigator.mediaSession.setActionHandler("play", noop);
    navigator.mediaSession.setActionHandler("pause", noop);
    navigator.mediaSession.setActionHandler("stop", noop);
  } catch {
    /* Media Session handlers are best-effort */
  }
}

export function getStopperState(): StopperState {
  return state;
}

export function getStopperError(): string | null {
  return lastError;
}

/** Call from a tap. Unlocks autoplay without taking audio focus (muted). */
export async function prepareStopper(): Promise<boolean> {
  lastError = null;
  if (typeof window === "undefined") return false;
  try {
    const el = ensureAudio();
    el.muted = true;
    el.volume = 0;
    await el.play();
    el.pause();
    el.currentTime = 0;
    el.muted = false;
    await unlockWebAudio();
    state = "prepared";
    return true;
  } catch (err) {
    lastError = err instanceof Error ? err.message : "Could not unlock audio";
    try {
      await unlockWebAudio();
      state = "prepared";
      return true;
    } catch (inner) {
      lastError = inner instanceof Error ? inner.message : lastError;
      return false;
    }
  }
}

export async function startHoldingFocus(): Promise<boolean> {
  lastError = null;
  if (typeof window === "undefined") return false;
  try {
    if (state === "idle") {
      await prepareStopper();
    }
    const el = ensureAudio();
    el.muted = false;
    el.volume = 0.06;
    el.loop = true;
    await el.play();
    if (ctx && ctx.state === "suspended") {
      await ctx.resume();
    }
    setMediaSession(true);
    state = "holding";
    return true;
  } catch (err) {
    lastError = err instanceof Error ? err.message : "Could not take audio focus";
    if (ctx) {
      try {
        await fallbackOscillatorHold();
        state = "holding";
        return true;
      } catch {
        /* fall through */
      }
    }
    return false;
  }
}

async function fallbackOscillatorHold(): Promise<void> {
  if (!ctx) return;
  await ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 42;
  osc.type = "sine";
  gain.gain.value = 0.012;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  setMediaSession(true);
}

export function releaseFocus(): void {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  setMediaSession(false);
  if (state === "holding") state = "prepared";
}

export async function playChime(): Promise<void> {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const local = ctx && ctx.state !== "closed" ? ctx : new AC();
    await local.resume();
    const now = local.currentTime;
    const tones = [392, 494, 587];
    tones.forEach((freq, i) => {
      const osc = local.createOscillator();
      const gain = local.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t0 = now + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.07, t0 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
      osc.connect(gain);
      gain.connect(local.destination);
      osc.start(t0);
      osc.stop(t0 + 0.95);
    });
  } catch {
    /* chime is optional */
  }
}

export function vibrateDone(): void {
  try {
    navigator.vibrate?.([160, 70, 160, 70, 240]);
  } catch {
    /* no vibration */
  }
}

export async function notifyPaused(): Promise<void> {
  try {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
    if (Notification.permission === "granted") {
      new Notification("Hush", {
        body: "Apple Music is paused.",
        icon: "/favicon.svg",
        silent: true,
      });
    }
  } catch {
    /* notifications optional */
  }
}

export async function requestNotificationPermission(): Promise<void> {
  try {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  } catch {
    /* ignore */
  }
}
