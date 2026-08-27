import { Download, Lock } from 'lucide-react'

const platforms = ['Windows', 'macOS', 'Linux']

export function BetaStatus() {
  return (
    <section id="download" className="relative px-4 py-20 sm:py-28">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 zip-glow"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur">
            <Lock className="size-3 text-muted-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Closed beta
            </span>
          </div>

          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Downloads aren&apos;t open yet
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Zip Client is still in beta while we finish testing across versions
            and loaders. The download button unlocks the moment the first public
            build is signed and ready.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                type="button"
                disabled
                aria-disabled="true"
                title="Downloads are not open yet"
                className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-muted px-5 py-3 text-sm font-medium text-muted-foreground"
              >
                <Download className="size-4" />
                {platform}
              </button>
            ))}
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            No release date announced
          </p>
        </div>
      </div>
    </section>
  )
}
