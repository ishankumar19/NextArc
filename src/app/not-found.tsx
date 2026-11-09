import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-md w-full text-center space-y-6 p-8">
        <div className="text-6xl font-black text-slate-700">404</div>
        <div>
          <h1 className="text-xl font-bold text-white">Page not found</h1>
          <p className="text-sm text-slate-400 mt-2">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
