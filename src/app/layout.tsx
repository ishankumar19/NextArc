import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
