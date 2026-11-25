import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080A0F] px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-[#0C1017] border border-white/[0.08] rounded-2xl shadow-2xl">
        <div className="font-mono text-5xl font-bold tracking-tight text-white/20">404</div>
        <div className="space-y-1.5">
          <h1 className="text-lg font-semibold text-white tracking-tight">Resource Not Found</h1>
          <p className="text-xs text-neutral-400 font-mono">
            The requested route does not exist or has been relocated.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition border border-indigo-500/30 shadow-sm"
        >
          Return to Overview
        </Link>
      </div>
    </main>
  );
}
