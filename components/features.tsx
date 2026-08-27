import Image from 'next/image'
import {
  Boxes,
  Gauge,
  History,
  Layers,
  PaintBucket,
  Sliders,
  WifiOff,
} from 'lucide-react'

const features = [
  {
    icon: History,
    title: 'Every version, ever',
    body: 'From the earliest playable builds through every alpha, beta, release, snapshot and April Fools joke, right up to the latest release.',
  },
  {
    icon: Layers,
    title: 'Mod loaders built in',
    body: 'Fabric, Forge, NeoForge, Quilt and OptiFine install with one click. No manual jar wrangling, no wiki tabs open.',
  },
  {
    icon: Sliders,
    title: 'Settings that go deep',
    body: 'RAM allocation, JVM arguments, Java runtimes, window size, per-instance overrides and game directory control.',
  },
  {
    icon: WifiOff,
    title: 'Works offline',
    body: 'Offline accounts and cached assets mean you can launch and play with no connection at all.',
  },
  {
    icon: Boxes,
    title: 'Separate instances',
    body: 'Keep a vanilla world, a modpack and a snapshot side by side. Nothing bleeds between them.',
  },
  {
    icon: Gauge,
    title: 'Light and quick',
    body: 'Cold start to in-game in seconds. Zip stays small, stays quiet and stays out of the way.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          What&apos;s inside
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything a launcher should do, and nothing it shouldn&apos;t
        </h2>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <feature.icon className="size-5 text-primary" />
              <h3 className="mt-4 font-medium tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </div>

        {/* Skin editor spotlight */}
        <div className="mt-3 grid gap-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card/60 p-6 lg:col-span-2 lg:p-8">
            <PaintBucket className="size-5 text-primary" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">
              A skin editor, right in the launcher
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Draw pixel by pixel, work in layers, pick from a palette and spin
              the 3D model to check your work from every angle. Apply it without
              ever opening a browser or uploading a file to a stranger&apos;s
              website.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                'Live 3D preview with slim and classic arms',
                'Layer support for overlays and hats',
                'Import, export and swap between saved skins',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-sm bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-64 overflow-hidden rounded-2xl border border-border bg-card lg:col-span-3">
            <Image
              src="/images/zip-skin-editor.png"
              alt="Zip Client skin editor with a 3D character preview, colour palette and layer list"
              width={1200}
              height={1200}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
