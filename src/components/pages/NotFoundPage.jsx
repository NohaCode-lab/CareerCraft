import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-lg backdrop-blur-sm">
      
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <AlertTriangle size={28} />
      </div>

      {/* Badge */}
      <span className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-300">
        404 Error
      </span>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
        The page you are looking for does not exist, may have been moved, or the URL is incorrect.
      </p>

      {/* Action */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;