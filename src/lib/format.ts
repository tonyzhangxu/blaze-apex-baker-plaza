export function formatMs(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatClock(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function upcomingStops(count = 8): Date[] {
  const step = 15 * 60 * 1000;
  const now = Date.now();
  let t = Math.ceil((now + 60_000) / step) * step;
  return Array.from({ length: count }, (_, i) => new Date(t + i * step));
}

export function minutesFromUntil(until: Date): number {
  let diff = until.getTime() - Date.now();
  if (diff < 60_000) diff += 24 * 60 * 60 * 1000;
  return Math.max(1, Math.round(diff / 60_000));
}
