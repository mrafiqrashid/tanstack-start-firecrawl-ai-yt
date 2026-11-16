import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Boxes,
  Brain,
  CheckCircle2,
  Cloud,
  Database,
  FormInput,
  Layout,
  Link2,
  Radio,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Tech = {
  name: string
  icon: LucideIcon
  tint: string
  description: string
}

const techStack: Record<string, Tech> = {
  framework: {
    name: 'TanStack Start',
    icon: Zap,
    tint: 'bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300',
    description: 'SSR, middleware & server functions',
  },
  ui: {
    name: 'shadcn/ui',
    icon: Layout,
    tint: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
    description: 'Polished component library',
  },
  forms: {
    name: 'TanStack Form + Zod',
    icon: FormInput,
    tint: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    description: 'Type-safe validation',
  },
  auth: {
    name: 'Better Auth',
    icon: Shield,
    tint: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    description: 'Secure authentication',
  },
  database: {
    name: 'Neon (Postgres)',
    icon: Database,
    tint: 'bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300',
    description: 'Serverless PostgreSQL',
  },
  ai: {
    name: 'OpenRouter + Firecrawl',
    icon: Brain,
    tint: 'bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300',
    description: 'Scraping & AI summaries',
  },
  deployment: {
    name: 'Vercel',
    icon: Cloud,
    tint: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    description: 'Optimized hosting',
  },
}

const highlights: Array<{ icon: LucideIcon; value: string; label: string; tint: string }> = [
  {
    icon: Boxes,
    value: String(Object.keys(techStack).length),
    label: 'Tools in the stack',
    tint: techStack.framework.tint,
  },
  { icon: ShieldCheck, value: '100% TS', label: 'End-to-end types', tint: techStack.ui.tint },
  { icon: Radio, value: 'Streaming', label: 'AI summaries', tint: techStack.ai.tint },
  { icon: Cloud, value: 'Vercel', label: 'Edge-ready hosting', tint: techStack.auth.tint },
]

function useGreeting() {
  // Start neutral so server and client render the same markup.
  const [greeting, setGreeting] = useState('Hello 👋')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning ☀️')
    else if (hour < 18) setGreeting('Good afternoon 🌤️')
    else setGreeting('Good evening 🌙')
  }, [])

  return greeting
}

function Mascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={className}>
      {/* shadow */}
      <ellipse cx="80" cy="146" rx="38" ry="6" className="fill-foreground/10" />
      {/* body */}
      <path
        d="M80 22c34 0 56 26 56 60 0 32-22 52-56 52s-56-20-56-52c0-34 22-60 56-60Z"
        className="fill-primary"
      />
      {/* belly highlight */}
      <ellipse cx="80" cy="96" rx="30" ry="24" className="fill-white/25" />
      {/* eyes */}
      <ellipse cx="62" cy="74" rx="6" ry="8" className="fill-foreground dark:fill-background" />
      <ellipse cx="98" cy="74" rx="6" ry="8" className="fill-foreground dark:fill-background" />
      <circle cx="64" cy="71" r="2" className="fill-white" />
      <circle cx="100" cy="71" r="2" className="fill-white" />
      {/* blush */}
      <ellipse cx="50" cy="90" rx="8" ry="4.5" className="fill-pink-300/80" />
      <ellipse cx="110" cy="90" rx="8" ry="4.5" className="fill-pink-300/80" />
      {/* smile */}
      <path
        d="M72 90q8 8 16 0"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        className="stroke-foreground dark:stroke-background"
      />
      {/* sprout */}
      <path d="M80 22c0-8 2-13 6-16" strokeWidth="3" strokeLinecap="round" fill="none" className="stroke-emerald-500" />
      <path d="M86 8c6-4 13-3 16 1-5 5-12 5-16-1Z" className="fill-emerald-400" />
      {/* sparkles */}
      <path d="M136 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" className="fill-amber-400" />
      <path d="M24 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" className="fill-sky-400" />
    </svg>
  )
}

export function WelcomeCard() {
  const greeting = useGreeting()

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="relative overflow-hidden rounded-3xl border-border/60 py-0 shadow-lg shadow-primary/5">
        {/* soft pastel blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-pink-300/20 blur-3xl dark:bg-pink-500/10" />
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 size-56 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10" />

        <div className="relative grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1fr_auto]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border bg-background/70 px-3 py-1 text-sm font-medium backdrop-blur">
                {greeting}
              </span>
              <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">
                <Sparkles className="size-3" />
                Production ready
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
                Welcome to your <span className="text-primary">dashboard</span>
              </h1>
              <p className="max-w-[60ch] text-base text-muted-foreground sm:text-lg">
                Turn any URL into clean, AI-generated summaries. A type-safe content pipeline
                built with TanStack Start, from scrape to insight.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/dashboard" className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-5')}>
                Open dashboard
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/dashboard/import"
                className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'rounded-full bg-background/70 px-5')}
              >
                <Link2 className="size-4" />
                Import a URL
              </Link>
            </div>
          </div>

          <Mascot className="mx-auto size-36 motion-safe:animate-float sm:size-44 md:size-52" />
        </div>
      </Card>

      {/* Highlights */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {highlights.map(({ icon: Icon, value, label, tint }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-sm"
          >
            <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', tint)}>
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold leading-tight">{value}</p>
              <p className="truncate text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">What's inside 🧩</h2>
            <p className="text-sm text-muted-foreground">The tools that power this project.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {Object.entries(techStack).map(([key, tech]) => {
            const Icon = tech.icon
            return (
              <div
                key={key}
                className="group rounded-2xl border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 motion-safe:hover:-translate-y-0.5"
              >
                <span
                  className={cn(
                    'mb-3 grid size-10 place-items-center rounded-xl transition-transform duration-300 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110',
                    tech.tint,
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="text-sm font-semibold">{tech.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{tech.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex gap-4 rounded-2xl border border-sky-200/70 bg-sky-50/70 p-5 dark:border-sky-500/20 dark:bg-sky-500/5">
          <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', techStack.ui.tint)}>
            <CheckCircle2 className="size-5" />
          </span>
          <div>
            <h3 className="font-semibold">End-to-end type safety</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-stack TypeScript with types inferred from the database all the way to the UI.
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-2xl border border-violet-200/70 bg-violet-50/70 p-5 dark:border-violet-500/20 dark:bg-violet-500/5">
          <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', techStack.forms.tint)}>
            <Server className="size-5" />
          </span>
          <div>
            <h3 className="font-semibold">Server functions (RPC)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Call server code straight from client components, fully typed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
