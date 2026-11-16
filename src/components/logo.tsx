import { useId } from 'react'
import { APP_NAME, APP_TAGLINE } from '@/lib/seo'
import { cn } from '@/lib/utils'

/** The Recall mark: a smiling bookmark with a little sparkle, on a warm squircle. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId()
  const gradient = `${id}-bg`

  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={APP_NAME} className={cn('size-8 shrink-0', className)}>
      <defs>
        <linearGradient id={gradient} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill={`url(#${gradient})`} />
      {/* bookmark */}
      <path d="M21 14h22a3 3 0 0 1 3 3v33.5a1.5 1.5 0 0 1-2.4 1.2L32 43l-11.6 8.7a1.5 1.5 0 0 1-2.4-1.2V17a3 3 0 0 1 3-3Z" fill="#fff" />
      {/* face */}
      <circle cx="27" cy="27" r="2.6" fill="#7C2D12" />
      <circle cx="37" cy="27" r="2.6" fill="#7C2D12" />
      <ellipse cx="24" cy="32" rx="2.6" ry="1.6" fill="#FDA4AF" />
      <ellipse cx="40" cy="32" rx="2.6" ry="1.6" fill="#FDA4AF" />
      <path d="M29 32.5q3 3 6 0" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* sparkle */}
      <path d="M50 8l1.8 4.2L56 14l-4.2 1.8L50 20l-1.8-4.2L44 14l4.2-1.8Z" fill="#FEF3C7" />
    </svg>
  )
}

type LogoProps = {
  className?: string
  markClassName?: string
  /** Show the tagline under the name. */
  withTagline?: boolean
}

/** Mark + wordmark lockup. */
export function Logo({ className, markClassName, withTagline = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={markClassName} />
      <span className="grid text-left leading-tight">
        <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        {withTagline && <span className="text-xs text-muted-foreground">{APP_TAGLINE}</span>}
      </span>
    </span>
  )
}
