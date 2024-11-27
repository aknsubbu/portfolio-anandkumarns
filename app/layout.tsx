import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
import { themeConfig } from "@/config/themeConfig";

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

const GradientBackground = () => {
  const { gradientColor } = themeConfig;

  return (
    <>
      {/* Left gradient spot */}
      <div
        className="fixed w-[1200px] h-[1200px] bottom-0 left-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at center,
            ${gradientColor.primary} 0%,
            ${gradientColor.secondary} 20%,
            ${gradientColor.tertiary} 40%,
            ${gradientColor.transparent} 70%
          )`,
          transform: "translate(-30%, 30%)",
          filter: "blur(80px)",
          opacity: "1",
          zIndex: 0,
        }}
      />

      {/* Right gradient spot */}
      <div
        className="fixed w-[1000px] h-[1000px] top-0 right-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at center,
            ${gradientColor.primary} 0%,
            ${gradientColor.secondary} 20%,
            ${gradientColor.tertiary} 40%,
            ${gradientColor.transparent} 70%
          )`,
          transform: "translate(30%, -30%)",
          filter: "blur(25px)",
          opacity: "1",
          zIndex: 0,
        }}
      />

      {/* Vertical light stripes */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            ${themeConfig.stripeColor} 1px,
            transparent 2px,
            transparent 20px
          )`,
          opacity: "0.3",
          zIndex: 0,
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="fixed inset-0 opacity-[0.30] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />
    </>
  );
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
          <div className="relative z-10 min-h-screen flex flex-col justify-between">
            <div>
              <header>
                <Navbar />
              </header>
              <main className="pb-20">{children}</main>
            </div>
            <div
              className={`mt-auto border-t-2 border-${themeConfig.borderColor}`}
            >
              {" "}
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
