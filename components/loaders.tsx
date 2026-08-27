const loaders = [
  {
    name: 'Fabric',
    note: 'Lightweight, fast to update, huge mod ecosystem.',
  },
  {
    name: 'Forge',
    note: 'The classic. Runs the big long-running modpacks.',
  },
  {
    name: 'NeoForge',
    note: 'The modern Forge fork, kept current with new releases.',
  },
  {
    name: 'Quilt',
    note: 'Fabric-compatible with extra loader features.',
  },
  {
    name: 'OptiFine',
    note: 'Shaders, resource packs and performance tuning.',
  },
]

export function Loaders() {
  return (
    <section id="loaders" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Mod loaders
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          The loaders people actually use, installed in one click
        </h2>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loaders.map((loader) => (
            <div
              key={loader.name}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <span className="text-lg font-medium tracking-tight">
                {loader.name}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {loader.note}
              </p>
            </div>
          ))}

          <div className="flex items-center rounded-2xl border border-dashed border-border p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Version matching is automatic — Zip only offers loaders that
              actually run on the build you picked.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
