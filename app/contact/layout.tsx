import clsx from "clsx";

export default function ContactLayout({
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
