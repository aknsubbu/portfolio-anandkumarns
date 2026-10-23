import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import GradientBackground from "@/components/GradientBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";

import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
          "min-h-screen bg-background font-sans antialiased bg-black relative font-mono"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <GradientBackground />
          <ScrollProgressBar />
          <div className="relative z-10 min-h-screen flex flex-col justify-between">
            <div>
              <header>
                <Navbar />
              </header>
              <main className="pb-20">{children}</main>
            </div>
            <div
              className="mt-auto border-t-2 border-gray-400"
            >
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}
