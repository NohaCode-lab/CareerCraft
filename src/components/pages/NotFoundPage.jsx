import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-lg backdrop-blur-xl">
      
      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 text-red-400 shadow-inner shadow-red-500/10">
        <AlertTriangle size={30} />
      </div>

      {/* Badge */}
      <span className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-300">
        404 Error
      </span>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
        The page you are looking for does not exist, may have been moved, or the URL is incorrect.
      </p>

      {/* Action */}
      <Link
        to="/"
        className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;