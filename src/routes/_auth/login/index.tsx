import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/web/login-form'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/_auth/login/')({
  head: () => ({ meta: seo({ title: 'Log in', description: 'Log in to your Recall knowledge base.' }) }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoginForm/>
  )
}
