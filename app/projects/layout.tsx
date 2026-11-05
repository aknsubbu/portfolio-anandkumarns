import { Metadata } from "next";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("min-h-screen bg-transparent font-mono antialiased")}>
      <div className="container mx-auto max-w-7xl px-6">{children}</div>
    </div>
  );
}
