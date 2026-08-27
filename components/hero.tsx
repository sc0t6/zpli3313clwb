import Image from 'next/image'
import { Clock, Download } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-36 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 zip-grid" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] zip-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Beta — build 0.4.2
          </span>
        </div>

        <h1 className="mt-7 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          A Minecraft launcher that
          <span className="text-primary"> just works</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Zip Client runs every version from the very first build to the newest
          release, ships the mod loaders you already use, and stays out of your
          way. One window, one button, no setup guides.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Downloads are not open yet"
              className="group flex cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-muted px-6 py-3.5 text-sm font-medium text-muted-foreground"
            >
              <Download className="size-4" />
              Download for Windows
            </button>
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
              <Clock className="size-3" />
              Not available yet
            </span>
          </div>

          <a
            href="#features"
            className="rounded-xl border border-border bg-card/60 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
          >
            See what it does
          </a>
        </div>
      </div>

      {/* Signature element: the launcher window itself */}
      <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
        <div
          aria-hidden="true"
          className="absolute -inset-x-8 -top-8 bottom-0 rounded-[2rem] bg-primary/10 blur-3xl"
        />
        <div className="relative aspect-[819/618] overflow-hidden rounded-2xl border border-border bg-card zip-hairline">
          {/* The generated art contains its own window at ~x103-922, y202-820 of
              1024px. Scale up and offset so only that region is visible. */}
          <Image
            src="/images/zip-launcher-home.png"
            alt="The Zip Client launcher home screen, showing a large play button, a version selector and a sidebar for versions, mods, skins and settings"
            width={1024}
            height={1024}
            priority
            className="absolute left-[0%] top-[-5%] w-[125%] max-w-none"
          />
        </div>
      </div>
    </section>
  )
}
