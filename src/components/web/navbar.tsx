import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./toggle-theme";

export function Navbar() {

    const { data: session, isPending } = authClient.useSession()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    toast.success('Signed out successfully ')
                },
                onError: ({ error }) => {
                    toast.error(error.message)
                }
            }
        })
    }

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img
                        src="https://tanstack.com/images/logos/logo-color-banner-600.png"
                        alt="Tanstack Start Logo"
                        className="size-8" />
                    <h1 className="text-lg font-semibold">TanStack Start</h1>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {isPending ? null : session ? (
                        <>
                            <Button variant="secondary" onClick={handleSignOut} asChild>
                                <span>Logout</span>
                            </Button>
                            <Link className={buttonVariants()} to="/dashboard">Dashboard</Link>
                        </>

                    ) : (
                        <>
                            <Link className={buttonVariants({ variant: 'secondary' })} to="/login">Login</Link>
                            <Link className={buttonVariants()} to="/signup">Get Started</Link>
                        </>

                    )}


                </div>
            </div>
        </nav >
    )
}