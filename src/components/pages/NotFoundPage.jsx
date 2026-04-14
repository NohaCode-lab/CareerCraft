
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const NotFoundPage = () => {
  return (
    <MainLayout pageTitle="Not Found">
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600">
          404 Error
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;