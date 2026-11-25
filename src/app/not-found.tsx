import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-[#E2E8E3] rounded-2xl shadow-subtle">
        <div className="font-mono text-5xl font-extrabold tracking-tight text-[#172923]/20">404</div>
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-[#172923] tracking-tight">Resource Not Found</h1>
          <p className="text-xs text-[#52665D]">
            The requested route does not exist or has been relocated.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-[#176B5B] hover:bg-[#115246] text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          Return to Overview
        </Link>
      </div>
    </main>
  );
}
