import { BetaStatus } from '@/components/beta-status'
import { Faq } from '@/components/faq'
import { Features } from '@/components/features'
import { Hero } from '@/components/hero'
import { Loaders } from '@/components/loaders'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { Versions } from '@/components/versions'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <Versions />
        <Loaders />
        <BetaStatus />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
