"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <main className="min-h-screen flex items-center justify-center bg-[#080A0F] px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-[#0C1017] border border-white/[0.08] rounded-2xl shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center font-mono text-lg font-bold">
          !
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold text-white tracking-tight">Application Error</h1>
          <p className="text-xs text-neutral-400 font-mono break-words leading-relaxed">
            {process.env.NODE_ENV === "development"
              ? error.message
              : "An unexpected runtime error occurred. Telemetry and state have been logged."}
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition border border-indigo-500/30 shadow-sm"
          >
            Retry Action
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs font-medium rounded-lg transition border border-white/[0.08]"
          >
            Overview
          </Link>
        </div>
      </div>
    </main>
  );
}
