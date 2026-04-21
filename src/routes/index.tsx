import { Navbar } from "@/components/web/navbar";
import { WelcomeCard } from "@/components/welcome-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Navbar />
      {/* <ComponentExample /> */}
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <WelcomeCard />

      </div>
    </>
  );
}