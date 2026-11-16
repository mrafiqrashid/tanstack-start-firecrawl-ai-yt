import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import { Logo } from "../logo";
import { ThemeToggle } from "./toggle-theme";
import { authClient } from "@/lib/auth-client";

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
                <Link to="/" className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Logo />
                </Link>
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