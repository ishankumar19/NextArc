"use client";

import { useEffect } from "react";

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
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-md w-full text-center space-y-6 p-8">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center text-2xl">
          ⚠
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Something went wrong</h1>
          <p className="text-sm text-slate-400 mt-2">
            {process.env.NODE_ENV === "development"
              ? error.message
              : "An unexpected error occurred. Please try again."}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-lg transition"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
