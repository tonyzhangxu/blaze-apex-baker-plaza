import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Minus, i as Plus, o as Info, r as Settings2, s as Check, t as VolumeX } from "../_libs/lucide-react.mjs";
import { p as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CkKQy3Cq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-[color,background-color,opacity,transform,box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-foreground hover:bg-muted",
			muted: "bg-muted text-foreground hover:bg-muted/80"
		},
		size: {
			default: "h-11 rounded-md px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-6",
			xl: "h-14 rounded-xl px-6 text-base",
			icon: "size-11 rounded-md",
			chip: "h-11 rounded-full px-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function formatMs(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function formatClock(date) {
	return date.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function upcomingStops(count = 8) {
	const step = 9e5;
	let t = Math.ceil((Date.now() + 6e4) / step) * step;
	return Array.from({ length: count }, (_, i) => new Date(t + i * step));
}
var SIZE = 288;
var STROKE = 3.5;
var CX = SIZE / 2;
var CY = SIZE / 2;
var R = (SIZE - STROKE * 2 - 18) / 2;
var CIRC = Math.round(2 * Math.PI * R * 100) / 100;
function q(n) {
	return Math.round(n * 100) / 100;
}
var TICKS = Array.from({ length: 60 }, (_, i) => {
	const major = i % 5 === 0;
	const angle = i / 60 * Math.PI * 2;
	const inner = R + (major ? 6 : 10);
	const outer = 145.5;
	return {
		i,
		major,
		x1: q(CX + Math.cos(angle) * inner),
		y1: q(CY + Math.sin(angle) * inner),
		x2: q(CX + Math.cos(angle) * outer),
		y2: q(CY + Math.sin(angle) * outer)
	};
});
function TimerRing({ remainingMs, durationMs, phase, label }) {
	const offset = q(CIRC * (1 - (phase === "holding" ? 0 : durationMs <= 0 ? 1 : Math.min(1, Math.max(0, remainingMs / durationMs)))));
	const display = phase === "holding" ? null : formatMs(phase === "idle" ? durationMs : remainingMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto aspect-square w-full max-w-72",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${SIZE} ${SIZE}`,
			className: "size-full -rotate-90",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: CX,
					cy: CY,
					r: 145.5,
					fill: "none",
					className: "stroke-foreground/10",
					strokeWidth: 1
				}),
				TICKS.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: tick.x1,
					y1: tick.y1,
					x2: tick.x2,
					y2: tick.y2,
					className: tick.major ? "stroke-foreground/30" : "stroke-foreground/10",
					strokeWidth: tick.major ? 1.4 : 1,
					strokeLinecap: "round"
				}, tick.i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: CX,
					cy: CY,
					r: R,
					fill: "none",
					className: "stroke-foreground/10",
					strokeWidth: STROKE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: CX,
					cy: CY,
					r: R,
					fill: "none",
					className: cn("stroke-primary", phase === "holding" && "stroke-primary/40"),
					strokeWidth: STROKE,
					strokeLinecap: "round",
					strokeDasharray: CIRC,
					strokeDashoffset: offset
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center px-8 text-center",
			children: phase === "holding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-3 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-6",
						strokeWidth: 2.25
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl font-medium tracking-tight text-foreground",
					children: "Paused"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Music is off"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-timer font-medium text-foreground tabular-nums",
				"aria-live": "polite",
				children: display
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: label
			})] })
		})]
	});
}
var PRESETS_MIN = [
	15,
	30,
	45,
	60,
	90
];
var defaultSettings = {
	keepAwake: true,
	vibrate: true,
	holdPause: true,
	endChime: false,
	dimScreen: true
};
function clampMin(min) {
	return Math.min(180, Math.max(1, Math.round(min)));
}
var useTimer = create()(persist((set, get) => ({
	durationMs: 18e5,
	remainingMs: 18e5,
	endsAt: null,
	phase: "idle",
	mode: "duration",
	lastPresetMin: 30,
	settings: defaultSettings,
	audioReady: false,
	audioError: null,
	setDurationMin: (min) => {
		const minutes = clampMin(min);
		const ms = minutes * 6e4;
		const { phase } = get();
		if (phase === "running" || phase === "holding") return;
		set({
			durationMs: ms,
			remainingMs: ms,
			lastPresetMin: minutes,
			phase: "idle"
		});
	},
	setMode: (mode) => {
		if (get().phase === "running" || get().phase === "holding") return;
		set({ mode });
	},
	patchSettings: (patch) => {
		set({ settings: {
			...get().settings,
			...patch
		} });
	},
	setAudioReady: (ready, error = null) => {
		set({
			audioReady: ready,
			audioError: error
		});
	},
	start: () => {
		const { remainingMs, durationMs, phase } = get();
		if (phase === "holding") return;
		const ms = phase === "paused" ? remainingMs : durationMs;
		set({
			remainingMs: ms,
			durationMs: phase === "paused" ? durationMs : ms,
			endsAt: Date.now() + ms,
			phase: "running"
		});
	},
	pause: () => {
		const { phase, endsAt } = get();
		if (phase !== "running" || !endsAt) return;
		set({
			remainingMs: Math.max(0, endsAt - Date.now()),
			endsAt: null,
			phase: "paused"
		});
	},
	resume: () => {
		const { phase, remainingMs } = get();
		if (phase !== "paused") return;
		set({
			endsAt: Date.now() + remainingMs,
			phase: "running"
		});
	},
	addMinutes: (min) => {
		const { phase, remainingMs, durationMs, endsAt } = get();
		const extra = min * 6e4;
		if (phase === "running" && endsAt) {
			const nextEnd = endsAt + extra;
			set({
				endsAt: nextEnd,
				remainingMs: Math.max(0, nextEnd - Date.now()),
				durationMs: durationMs + extra
			});
			return;
		}
		if (phase === "idle" || phase === "paused") {
			const next = clampMin((remainingMs + extra) / 6e4) * 6e4;
			set({
				remainingMs: next,
				durationMs: next,
				lastPresetMin: next / 6e4
			});
		}
	},
	cancel: () => {
		const { durationMs } = get();
		set({
			phase: "idle",
			endsAt: null,
			remainingMs: durationMs
		});
	},
	hold: () => {
		set({
			phase: "holding",
			endsAt: null,
			remainingMs: 0
		});
	},
	finish: () => {
		const { durationMs } = get();
		set({
			phase: "idle",
			endsAt: null,
			remainingMs: durationMs
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
				phase: "holding"
			});
			return;
		}
		set({ remainingMs });
	}
}), {
	name: "hush-timer",
	partialize: (s) => ({
		durationMs: s.durationMs,
		remainingMs: s.phase === "idle" ? s.durationMs : s.remainingMs,
		lastPresetMin: s.lastPresetMin,
		settings: s.settings,
		mode: s.mode
	}),
	skipHydration: true
}));
function IdleControls({ mode, durationMin, onMode, onPreset, onStep, onUntil }) {
	const [untils, setUntils] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (mode !== "until") return;
		setUntils(upcomingStops(8));
	}, [mode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			"aria-label": "Timer mode",
			className: "mx-auto grid w-full max-w-xs grid-cols-2 rounded-xl bg-muted p-1",
			children: [["duration", "Timer"], ["until", "Until"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": mode === id,
				className: cn("h-10 rounded-lg text-sm font-medium transition-[background-color,color] duration-150 ease-out", mode === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
				onClick: () => onMode(id),
				children: label
			}, id))
		}), mode === "duration" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: PRESETS_MIN.map((min) => {
				const active = durationMin === min;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "chip",
					variant: active ? "default" : "outline",
					"aria-pressed": active,
					onClick: () => onPreset(min),
					children: [min, "m"]
				}, min);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": "Minus five minutes",
					onClick: () => onStep(-5),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-24 text-center text-sm text-muted-foreground",
					children: [durationMin, " min"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": "Plus five minutes",
					onClick: () => onStep(5),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
				})
			]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: untils.map((d) => {
				const min = Math.max(1, Math.round((d.getTime() - Date.now()) / 6e4));
				const active = durationMin === min;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "chip",
					variant: active ? "default" : "outline",
					"aria-pressed": active,
					onClick: () => onUntil(min),
					children: formatClock(d)
				}, d.toISOString());
			})
		})]
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-7 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-[var(--shadow-border)] transition-colors duration-150 ease-out data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-40", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-foreground shadow-sm transition-transform duration-150 ease-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1 data-[state=checked]:bg-primary-foreground") })
}));
Switch.displayName = Switch$1.displayName;
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none text-foreground", className),
	...props
}));
Label.displayName = Root.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root$1.displayName;
function Drawer$1({ shouldScaleBackground = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		shouldScaleBackground,
		...props
	});
}
Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
Drawer.Close;
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		className: cn("fixed inset-0 z-50 bg-background/70", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-md flex-col rounded-t-2xl bg-card pb-[max(1.25rem,env(safe-area-inset-bottom))] text-card-foreground shadow-[var(--shadow-border)]", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border" }), children]
	})] });
}
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1 px-6 pt-5 pb-3", className),
		...props
	});
}
function DrawerTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function DrawerDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function DrawerBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("overflow-y-auto px-6 pb-2", className),
		...props
	});
}
var rows = [
	{
		key: "keepAwake",
		title: "Keep screen awake",
		hint: "Stops Android from freezing the timer. Dim the brightness if you like."
	},
	{
		key: "dimScreen",
		title: "Night dim",
		hint: "Fades the chrome after a few seconds so the room stays dark."
	},
	{
		key: "holdPause",
		title: "Hold the pause",
		hint: "Keeps audio focus after the stop so Apple Music cannot resume."
	},
	{
		key: "vibrate",
		title: "Vibrate when done",
		hint: "A short pulse when music is paused."
	},
	{
		key: "endChime",
		title: "Soft chime",
		hint: "Off by default so it will not wake you."
	}
];
function SettingsDrawer({ open, onOpenChange, settings, onPatch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Leave Hush on screen while the timer runs. Android will pause background tabs." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerBody, {
			className: "pb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `setting-${row.key}`,
							className: "text-base",
							children: row.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-snug text-muted-foreground",
							children: row.hint
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: `setting-${row.key}`,
						checked: settings[row.key],
						onCheckedChange: (checked) => onPatch({ [row.key]: checked }),
						className: "mt-0.5"
					})]
				})] }, row.key))
			})
		})] })
	});
}
var steps = [
	{
		n: "01",
		title: "Start Apple Music",
		body: "Play from the Apple Music app on this phone — or Spotify, YouTube Music, or anything else that uses Android audio focus."
	},
	{
		n: "02",
		title: "Set a time, tap Start",
		body: "Leave Hush in the foreground. It keeps the screen awake so the countdown cannot freeze. Turn brightness down for the bedroom."
	},
	{
		n: "03",
		title: "Hush takes the speakers",
		body: "When time is up, Hush starts a near-silent hold. Android hands it audio focus, which pauses Apple Music. Keep Hush open if you want it to stay paused."
	}
];
function HowItWorks({ open, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: "How the pause works" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: "Browsers cannot press pause inside Apple Music. On Android they can take audio focus — the same signal headphones and other apps use." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerBody, {
			className: "pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-5",
				children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display w-8 shrink-0 pt-0.5 text-sm tracking-wide text-muted-foreground",
						children: step.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-foreground",
						children: step.body
					})] })]
				}, step.n))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-relaxed text-muted-foreground",
				children: "Add Hush to your home screen from the browser menu so it opens like an app. The Pause now button lets you test with music already playing."
			})]
		})] })
	});
}
function MoonMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.2 2.15c.28-.08.52.2.4.47A9.5 9.5 0 1 1 5.38 16.9c-.24.16-.52-.1-.4-.36A10.8 10.8 0 0 0 13.2 2.15Z" })
	});
}
var audio = null;
var ctx = null;
var holdUrl = null;
var state = "idle";
var lastError = null;
function wavHeader(view, dataBytes, sampleRate) {
	const write = (offset, str) => {
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
function buildHoldWav() {
	const sampleRate = 44100;
	const n = sampleRate * 2;
	const buffer = /* @__PURE__ */ new ArrayBuffer(176444);
	const view = new DataView(buffer);
	wavHeader(view, n * 2, sampleRate);
	for (let i = 0; i < n; i++) {
		const sample = Math.sin(2 * Math.PI * 42 * i / sampleRate) * .018 * 32767;
		view.setInt16(44 + i * 2, sample, true);
	}
	return new Blob([buffer], { type: "audio/wav" });
}
function ensureAudio() {
	if (audio) return audio;
	holdUrl = URL.createObjectURL(buildHoldWav());
	audio = new Audio(holdUrl);
	audio.loop = true;
	audio.preload = "auto";
	audio.setAttribute("playsinline", "true");
	audio.setAttribute("webkit-playsinline", "true");
	return audio;
}
async function unlockWebAudio() {
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return;
	if (!ctx) ctx = new AC();
	if (ctx.state === "suspended") await ctx.resume();
}
function setMediaSession(holding) {
	if (!("mediaSession" in navigator)) return;
	try {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: holding ? "Holding pause" : "Hush",
			artist: "Hush sleep timer",
			album: "Music paused"
		});
		navigator.mediaSession.playbackState = holding ? "playing" : "none";
		const noop = () => void 0;
		navigator.mediaSession.setActionHandler("play", noop);
		navigator.mediaSession.setActionHandler("pause", noop);
		navigator.mediaSession.setActionHandler("stop", noop);
	} catch {}
}
function getStopperError() {
	return lastError;
}
/** Call from a tap. Unlocks autoplay without taking audio focus (muted). */
async function prepareStopper() {
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
async function startHoldingFocus() {
	lastError = null;
	if (typeof window === "undefined") return false;
	try {
		if (state === "idle") await prepareStopper();
		const el = ensureAudio();
		el.muted = false;
		el.volume = .06;
		el.loop = true;
		await el.play();
		if (ctx && ctx.state === "suspended") await ctx.resume();
		setMediaSession(true);
		state = "holding";
		return true;
	} catch (err) {
		lastError = err instanceof Error ? err.message : "Could not take audio focus";
		if (ctx) try {
			await fallbackOscillatorHold();
			state = "holding";
			return true;
		} catch {}
		return false;
	}
}
async function fallbackOscillatorHold() {
	if (!ctx) return;
	await ctx.resume();
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.frequency.value = 42;
	osc.type = "sine";
	gain.gain.value = .012;
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start();
	setMediaSession(true);
}
function releaseFocus() {
	if (audio) {
		audio.pause();
		audio.currentTime = 0;
	}
	setMediaSession(false);
	if (state === "holding") state = "prepared";
}
async function playChime() {
	try {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return;
		const local = ctx && ctx.state !== "closed" ? ctx : new AC();
		await local.resume();
		const now = local.currentTime;
		[
			392,
			494,
			587
		].forEach((freq, i) => {
			const osc = local.createOscillator();
			const gain = local.createGain();
			osc.type = "sine";
			osc.frequency.value = freq;
			const t0 = now + i * .12;
			gain.gain.setValueAtTime(1e-4, t0);
			gain.gain.exponentialRampToValueAtTime(.07, t0 + .03);
			gain.gain.exponentialRampToValueAtTime(1e-4, t0 + .9);
			osc.connect(gain);
			gain.connect(local.destination);
			osc.start(t0);
			osc.stop(t0 + .95);
		});
	} catch {}
}
function vibrateDone() {
	try {
		navigator.vibrate?.([
			160,
			70,
			160,
			70,
			240
		]);
	} catch {}
}
async function notifyPaused() {
	try {
		if (!("Notification" in window)) return;
		if (Notification.permission === "default") await Notification.requestPermission();
		if (Notification.permission === "granted") new Notification("Hush", {
			body: "Apple Music is paused.",
			icon: "/favicon.svg",
			silent: true
		});
	} catch {}
}
async function requestNotificationPermission() {
	try {
		if ("Notification" in window && Notification.permission === "default") await Notification.requestPermission();
	} catch {}
}
var sentinel = null;
var visibilityBound = false;
async function acquire() {
	try {
		const nav = navigator;
		if (!nav.wakeLock) return;
		sentinel = await nav.wakeLock.request("screen");
		sentinel.release = sentinel.release.bind(sentinel);
	} catch {
		sentinel = null;
	}
}
function onVisibility() {
	if (document.visibilityState === "visible" && wantLock && !sentinel) acquire();
}
var wantLock = false;
async function requestWakeLock() {
	wantLock = true;
	await acquire();
	if (!visibilityBound) {
		document.addEventListener("visibilitychange", onVisibility);
		visibilityBound = true;
	}
	return Boolean(sentinel);
}
async function releaseWakeLock() {
	wantLock = false;
	if (sentinel && !sentinel.released) try {
		await sentinel.release();
	} catch {}
	sentinel = null;
}
function useTimerEngine() {
	const phase = useTimer((s) => s.phase);
	const remainingMs = useTimer((s) => s.remainingMs);
	const settings = useTimer((s) => s.settings);
	const tick = useTimer((s) => s.tick);
	const prevPhase = (0, import_react.useRef)(phase);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (phase === "running" && settings.keepAwake) requestWakeLock();
		else if (phase !== "holding") releaseWakeLock();
	}, [phase, settings.keepAwake]);
	(0, import_react.useEffect)(() => {
		const enteredHold = phase === "holding" && prevPhase.current !== "holding";
		prevPhase.current = phase;
		if (!enteredHold) return;
		let cancelled = false;
		(async () => {
			const ok = await startHoldingFocus();
			if (cancelled) return;
			if (settings.vibrate) vibrateDone();
			if (settings.endChime) playChime();
			notifyPaused();
			if (!settings.holdPause && ok) window.setTimeout(() => {
				if (!cancelled) releaseFocus();
			}, 900);
		})();
		return () => {
			cancelled = true;
		};
	}, [
		phase,
		settings.vibrate,
		settings.endChime,
		settings.holdPause
	]);
	(0, import_react.useEffect)(() => {
		if (phase === "idle") {
			releaseFocus();
			releaseWakeLock();
		}
	}, [phase]);
	(0, import_react.useEffect)(() => {
		const base = "Hush";
		if (phase === "running") document.title = `${formatMs(remainingMs)} · ${base}`;
		else if (phase === "holding") document.title = `Paused · ${base}`;
		else document.title = base;
		return () => {
			document.title = base;
		};
	}, [phase, remainingMs]);
	(0, import_react.useEffect)(() => {
		const onVisible = () => {
			if (useTimer.getState().phase === "running") {
				useTimer.getState().tick();
				if (useTimer.getState().settings.keepAwake) requestWakeLock();
			}
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, []);
}
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
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [howOpen, setHowOpen] = (0, import_react.useState)(false);
	const [dimmed, setDimmed] = (0, import_react.useState)(false);
	const [hiddenWarn, setHiddenWarn] = (0, import_react.useState)(false);
	const durationMin = Math.round(durationMs / 6e4);
	(0, import_react.useEffect)(() => {
		useTimer.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		if (phase !== "running" || !settings.dimScreen) {
			setDimmed(false);
			return;
		}
		let t = window.setTimeout(() => setDimmed(true), 8e3);
		const bump = () => {
			setDimmed(false);
			window.clearTimeout(t);
			t = window.setTimeout(() => setDimmed(true), 8e3);
		};
		window.addEventListener("pointerdown", bump);
		return () => {
			window.clearTimeout(t);
			window.removeEventListener("pointerdown", bump);
		};
	}, [phase, settings.dimScreen]);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			setHiddenWarn(document.visibilityState === "hidden" && useTimer.getState().phase === "running");
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	async function onStart() {
		const ok = await prepareStopper();
		setAudioReady(ok, ok ? null : getStopperError());
		requestNotificationPermission();
		if (settings.keepAwake) requestWakeLock();
		start();
	}
	async function onPauseNow() {
		const ok = await prepareStopper();
		setAudioReady(ok, ok ? null : getStopperError());
		if (!await startHoldingFocus()) setAudioReady(false, getStopperError());
		hold();
	}
	function onFinish() {
		releaseFocus();
		finish();
	}
	const ringLabel = phase === "running" ? "until music pauses" : phase === "paused" ? "timer paused" : phase === "holding" ? settings.holdPause ? "holding audio focus" : "music paused" : "then music pauses";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: cn("relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]", dimmed && "cursor-none"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("night-dim flex items-center justify-between", dimmed ? "opacity-0" : "opacity-100"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-md bg-secondary text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMark, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-medium leading-none tracking-tight",
						children: "Hush"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Sleep timer"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": "How it works",
						onClick: () => setHowOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": "Settings",
						onClick: () => setSettingsOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-1 flex-col items-center justify-center py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerRing, {
						remainingMs,
						durationMs,
						phase,
						label: ringLabel
					}),
					hiddenWarn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-center text-sm text-muted-foreground",
						children: "Bring Hush back to the front — Android may freeze a hidden tab."
					}) : null,
					audioError && phase === "holding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-center text-sm text-muted-foreground",
						children: "Could not take audio focus. Tap Pause now after allowing sound."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn("night-dim flex flex-col gap-4", dimmed ? "pointer-events-none opacity-0" : "opacity-100"),
				children: [
					phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger-in flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleControls, {
								mode,
								durationMin,
								onMode: setMode,
								onPreset: setDurationMin,
								onStep: (d) => setDurationMin(durationMin + d),
								onUntil: setDurationMin
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "xl",
									onClick: () => void onStart(),
									children: [
										"Stop music in ",
										durationMin,
										" min"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "lg",
									variant: "ghost",
									onClick: () => void onPauseNow(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {}), "Pause now"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs leading-relaxed text-muted-foreground",
								children: "Leave this screen open. Add Hush to your home screen from the browser menu for a full-screen Android timer."
							})
						]
					}) : null,
					phase === "running" || phase === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "lg",
								className: "flex-1",
								onClick: () => addMinutes(5),
								children: "+5 min"
							}), phase === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "muted",
								size: "lg",
								className: "flex-1",
								onClick: pause,
								children: "Pause timer"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "muted",
								size: "lg",
								className: "flex-1",
								onClick: resume,
								children: "Resume"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "lg",
							onClick: cancel,
							children: "Cancel"
						})]
					}) : null,
					phase === "holding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-secondary px-5 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: settings.holdPause ? "Holding audio focus" : "Pause sent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted-foreground",
									children: "Apple Music, Spotify, and other Android players should now be paused. Keep this screen open if you want them to stay off."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "xl",
								onClick: onFinish,
								children: "Done"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "lg",
								onClick: () => {
									releaseFocus();
									finish();
								},
								children: "Set another time"
							})
						]
					}) : null
				]
			}),
			dimmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute inset-x-0 bottom-10 text-center text-xs text-muted-foreground",
				children: "Tap to wake"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDrawer, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen,
				settings,
				onPatch: patchSettings
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {
				open: howOpen,
				onOpenChange: setHowOpen
			})
		]
	});
}
//#endregion
export { Home as component };
