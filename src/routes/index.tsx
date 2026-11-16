import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/web/navbar";
import { WelcomeCard } from "@/components/welcome-card";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({ meta: seo() }),
});

function App() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <WelcomeCard />
      </main>
    </div>
  );
}
