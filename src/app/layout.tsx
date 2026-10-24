import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Progress | Evidence-First Goal Progression",
  description: "Goal-adaptive skill progression platform for Competitive Programming & DSA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
