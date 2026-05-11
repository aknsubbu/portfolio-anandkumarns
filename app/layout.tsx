import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";

import { siteConfig } from "@/config/site";
import { fontSans, fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#141414" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

const GradientBackground = () => (
  <>
    <div
      className="fixed bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at center, rgba(240,129,53,0.07) 0%, transparent 70%)",
        transform: "translate(-20%, 20%)",
        filter: "blur(100px)",
        zIndex: 0,
      }}
    />
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        zIndex: 0,
      }}
    />
  </>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#141414] antialiased relative",
          fontSans.variable,
          fontMono.variable,
          "font-sans"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ScrollProgress />
          <GradientBackground />
          <div className="relative z-10 min-h-screen flex flex-col">
            <header>
              <Navbar />
            </header>
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
