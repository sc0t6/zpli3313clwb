'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ZipMark } from '@/components/zip-mark'
import { cn } from '@/lib/utils'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#versions', label: 'Versions' },
  { href: '#loaders', label: 'Mod loaders' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          'mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-border px-4 py-3 transition-colors duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl zip-hairline'
            : 'border-transparent bg-transparent',
        )}
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <ZipMark className="size-7" />
          <span className="text-sm font-semibold tracking-tight">
            Zip Client
          </span>
        </a>

        <span className="ml-1 hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary sm:inline-block">
          Beta
        </span>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="hidden cursor-not-allowed rounded-lg border border-border bg-muted px-3.5 py-2 text-sm font-medium text-muted-foreground sm:inline-block"
          >
            Download
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-border bg-background/95 p-2 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
