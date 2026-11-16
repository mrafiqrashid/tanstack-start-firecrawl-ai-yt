import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@/components/web/signup-form'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/_auth/signup/')({
  head: () => ({ meta: seo({ title: 'Sign up', description: 'Create a free Recall account and start saving links.' }) }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SignupForm />
  )
}
