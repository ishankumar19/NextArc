import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Progress — Competitive Programming Intelligence",
  description:
    "Evidence-first skill progression platform. Understand where you are, identify genuine bottlenecks, and systematically reach your rating goals.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080A0F] text-slate-100 antialiased min-h-screen flex flex-col font-sans">
        <Navigation />
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
