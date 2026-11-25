"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-[#E2E8E3] rounded-2xl shadow-subtle">
        <div className="w-12 h-12 rounded-xl bg-[#FDF2F2] border border-[#F5C6C6] text-[#C65D5D] mx-auto flex items-center justify-center font-mono text-lg font-bold">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[#172923] tracking-tight">Application Error</h1>
          <p className="text-xs text-[#52665D] font-mono break-words leading-relaxed">
            {process.env.NODE_ENV === "development"
              ? error.message
              : "An unexpected runtime error occurred. Telemetry and state have been logged."}
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-[#176B5B] hover:bg-[#115246] text-white text-xs font-semibold rounded-lg transition shadow-sm cursor-pointer"
          >
            Retry Action
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#F8FAF7] hover:bg-[#F0F4F1] text-[#172923] text-xs font-semibold rounded-lg transition border border-[#E2E8E3]"
          >
            Overview
          </Link>
        </div>
      </div>
    </main>
  );
}
