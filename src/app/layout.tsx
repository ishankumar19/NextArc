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
      <body className="bg-[#080A0F] text-slate-100 antialiased min-h-screen flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
        <Navigation />
        <div className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
          {children}
        </div>
      </body>
    </html>
  );
}
