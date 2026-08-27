'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Can I download Zip Client right now?',
    a: 'Not yet. Zip is in beta and there is no public build available, which is why every download button on this page is disabled. Nothing is hidden behind a signup — when it is ready, the buttons simply turn on.',
  },
  {
    q: 'Which versions can I launch?',
    a: 'All of them. Pre-classic, classic, indev, infdev, alpha, beta, every release, and weekly snapshots. Zip reads the full version manifest instead of a curated shortlist.',
  },
  {
    q: 'Do I need an account to play?',
    a: 'You can sign in with a Microsoft account, or use an offline account if you have no connection. Offline mode uses cached assets, so a version you have already launched once will keep working with no internet.',
  },
  {
    q: 'Is it hard to set up?',
    a: 'No. Zip installs the right Java runtime, downloads assets and configures the loader for you. The default path from opening the launcher to being in a world is one dropdown and one button.',
  },
  {
    q: 'How much can I configure?',
    a: 'As much as you want. RAM, JVM arguments, Java path, resolution, game directory and environment variables can all be set globally or overridden per instance.',
  },
  {
    q: 'Does it work with modpacks?',
    a: 'Yes. Each instance is isolated with its own mods, config, saves and resource packs, so a heavy modpack cannot break your vanilla setup.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Questions
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked
        </h2>

        <div className="mt-10 flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-card/60"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
                >
                  <span className="flex-1 text-sm font-medium tracking-tight">
                    {faq.q}
                  </span>
                  <Plus
                    className={cn(
                      'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
                      isOpen && 'rotate-45 text-primary',
                    )}
                  />
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
