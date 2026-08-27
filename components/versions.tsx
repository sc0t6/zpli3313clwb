const eras = [
  { label: 'Pre-classic', range: 'rd-132211 → rd-160052' },
  { label: 'Classic & Indev', range: '0.0.x → in-20100223' },
  { label: 'Infdev & Alpha', range: 'inf-20100227 → a1.2.6' },
  { label: 'Beta', range: 'b1.0 → b1.9-pre6' },
  { label: 'Release', range: '1.0 → latest' },
  { label: 'Snapshots', range: 'weekly, as they drop' },
]

export function Versions() {
  return (
    <section id="versions" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60 p-8 sm:p-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Version coverage
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The first version to the latest one, in the same dropdown
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Zip pulls the full version manifest, so nothing is hidden behind a
            toggle or an advanced tab. Pick an era, pick a build, press play.
          </p>

          <div className="mt-10 flex flex-col gap-0 border-t border-border">
            {eras.map((era) => (
              <div
                key={era.label}
                className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors hover:border-primary/40"
              >
                <span className="font-medium tracking-tight transition-colors group-hover:text-primary">
                  {era.label}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {era.range}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
