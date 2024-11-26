import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased bg-transparent"
      )}
    >
      <div className="relative flex flex-col h-screen">
        <main className="container mx-auto max-w-7xl  px-6 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
