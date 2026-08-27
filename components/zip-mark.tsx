import { cn } from '@/lib/utils'

export function ZipMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-7 place-items-center rounded-lg border border-primary/40 bg-primary/15 font-mono text-[13px] font-bold leading-none text-primary',
        className,
      )}
    >
      Z
    </span>
  )
}
