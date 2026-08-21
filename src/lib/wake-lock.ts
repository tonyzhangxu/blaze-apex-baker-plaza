type Sentinel = { released: boolean; release: () => Promise<void> };

let sentinel: Sentinel | null = null;
let visibilityBound = false;

async function acquire(): Promise<void> {
  try {
    const nav = navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<Sentinel> };
    };
    if (!nav.wakeLock) return;
    sentinel = await nav.wakeLock.request("screen");
    sentinel.release = sentinel.release.bind(sentinel);
  } catch {
    sentinel = null;
  }
}

function onVisibility() {
  if (document.visibilityState === "visible" && wantLock && !sentinel) {
    void acquire();
  }
}

let wantLock = false;

export async function requestWakeLock(): Promise<boolean> {
  wantLock = true;
  await acquire();
  if (!visibilityBound) {
    document.addEventListener("visibilitychange", onVisibility);
    visibilityBound = true;
  }
  return Boolean(sentinel);
}

export async function releaseWakeLock(): Promise<void> {
  wantLock = false;
  if (sentinel && !sentinel.released) {
    try {
      await sentinel.release();
    } catch {
      /* already released */
    }
  }
  sentinel = null;
}

export function isWakeLockActive(): boolean {
  return Boolean(sentinel && !sentinel.released);
}
