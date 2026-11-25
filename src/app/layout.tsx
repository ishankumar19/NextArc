import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Progress — Competitive Programming Intelligence",
  description:
    "Evidence-first skill progression platform for competitive programmers. Connect your Codeforces and LeetCode accounts, uncover strengths and weaknesses, and systematically reach your rating goals.",
  keywords: [
    "competitive programming",
    "codeforces",
    "leetcode",
    "rating progression",
    "skill intelligence",
    "algorithm practice",
    "deliberate practice",
    "rating milestone",
  ],
  authors: [{ name: "Progress Team" }],
  openGraph: {
    title: "Progress — Competitive Programming Intelligence",
    description:
      "Evidence-first skill progression platform. Solve with purpose. Grow with Progress.",
    url: "https://next-arc-kappa.vercel.app",
    siteName: "Progress",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Progress — Competitive Programming Intelligence",
    description:
      "Your competitive programming journey, understood. Evidence-first goal progression for Codeforces and LeetCode.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F7F4",
  width: "device-width",
  initialScale: 1,
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
        <div className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
