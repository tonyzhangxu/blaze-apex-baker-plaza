import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Settings } from "@/lib/timer-store";

type SettingsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onPatch: (patch: Partial<Settings>) => void;
};

const rows: {
  key: keyof Settings;
  title: string;
  hint: string;
}[] = [
  {
    key: "keepAwake",
    title: "Keep screen awake",
    hint: "Stops Android from freezing the timer. Dim the brightness if you like.",
  },
  {
    key: "dimScreen",
    title: "Night dim",
    hint: "Fades the chrome after a few seconds so the room stays dark.",
  },
  {
    key: "holdPause",
    title: "Hold the pause",
    hint: "Keeps audio focus after the stop so Apple Music cannot resume.",
  },
  {
    key: "vibrate",
    title: "Vibrate when done",
    hint: "A short pulse when music is paused.",
  },
  {
    key: "endChime",
    title: "Soft chime",
    hint: "Off by default so it will not wake you.",
  },
];

export function SettingsDrawer({
  open,
  onOpenChange,
  settings,
  onPatch,
}: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Leave Hush on screen while the timer runs. Android will pause
            background tabs.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="pb-6">
          <ul className="flex flex-col">
            {rows.map((row, i) => (
              <li key={row.key}>
                {i > 0 ? <Separator /> : null}
                <div className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor={`setting-${row.key}`} className="text-base">
                      {row.title}
                    </Label>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">
                      {row.hint}
                    </p>
                  </div>
                  <Switch
                    id={`setting-${row.key}`}
                    checked={settings[row.key]}
                    onCheckedChange={(checked) => onPatch({ [row.key]: checked })}
                    className="mt-0.5"
                  />
                </div>
              </li>
            ))}
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
