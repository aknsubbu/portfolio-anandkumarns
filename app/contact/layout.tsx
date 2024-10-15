import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased bg-black"
      )}
    >
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
        <footer className="w-full flex items-center py-3">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
