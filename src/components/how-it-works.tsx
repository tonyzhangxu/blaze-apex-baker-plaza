import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type HowItWorksProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const steps = [
  {
    n: "01",
    title: "Start Apple Music",
    body: "Play from the Apple Music app on this phone — or Spotify, YouTube Music, or anything else that uses Android audio focus.",
  },
  {
    n: "02",
    title: "Set a time, tap Start",
    body: "Leave Hush in the foreground. It keeps the screen awake so the countdown cannot freeze. Turn brightness down for the bedroom.",
  },
  {
    n: "03",
    title: "Hush takes the speakers",
    body: "When time is up, Hush starts a near-silent hold. Android hands it audio focus, which pauses Apple Music. Keep Hush open if you want it to stay paused.",
  },
];

export function HowItWorks({ open, onOpenChange }: HowItWorksProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>How the pause works</DrawerTitle>
          <DrawerDescription>
            Browsers cannot press pause inside Apple Music. On Android they can
            take audio focus — the same signal headphones and other apps use.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="pb-8">
          <ol className="flex flex-col gap-5">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="font-display w-8 shrink-0 pt-0.5 text-sm tracking-wide text-muted-foreground">
                  {step.n}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Add Hush to your home screen from the browser menu so it opens like
            an app. The Pause now button lets you test with music already
            playing.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
