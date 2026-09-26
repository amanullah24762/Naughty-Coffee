import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naughty Coffee — Good coffee. A little attitude.",
  description: "Beautifully brewed coffee, slow mornings, and a little mischief. Discover the Naughty Coffee experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Grammarly can inject body attributes before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
