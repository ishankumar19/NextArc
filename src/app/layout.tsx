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
    <html lang="en">
      <body className="bg-[#F5F7F4] text-[#172923] antialiased min-h-screen flex flex-col font-sans selection:bg-[#CCE4D8] selection:text-[#0A2923]">
        <Navigation />
        <div className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
          {children}
        </div>
      </body>
    </html>
  );
}
