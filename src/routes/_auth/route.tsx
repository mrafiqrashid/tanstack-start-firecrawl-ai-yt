import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='min-h-screen'>
            <div className='absolute top-8 left-8'>
                <Link to='/' className={buttonVariants({ variant: 'secondary' })}>
                    <ArrowLeft /> Back to Home
                </Link>
            </div>
            <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-24'>
                <Link to='/' aria-label='Recall home'>
                    <Logo markClassName='size-10' />
                </Link>
                <Outlet />
            </div>
        </div>
    )
}
