import { ZipMark } from '@/components/zip-mark'

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <ZipMark />
            <span className="text-sm font-semibold tracking-tight">
              Zip Client
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A simple Minecraft launcher and client. Currently in beta.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-12">
          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
              Launcher
            </li>
            <li>
              <a
                href="#features"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#versions"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Versions
              </a>
            </li>
            <li>
              <a
                href="#loaders"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Mod loaders
              </a>
            </li>
          </ul>

          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
              More
            </li>
            <li>
              <a
                href="#faq"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </a>
            </li>
            <li>
              <span className="text-muted-foreground/50">Download — soon</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-border pt-6">
        <p className="text-xs leading-relaxed text-muted-foreground/70">
          Not affiliated with or endorsed by Mojang Studios or Microsoft.
          Minecraft is a trademark of Mojang Synergies AB.
        </p>
      </div>
    </footer>
  )
}
