import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { t } from '../../utils/i18n';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const getCurrentLanguage = (): string => {
  try {
    return (
      localStorage.getItem('careercraft_language') ||
      localStorage.getItem('app_language') ||
      'en'
    );
  } catch {
    return 'en';
  }
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[CareerCraft ErrorBoundary]', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.();
  };

  private handleGoToDashboard = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const language = getCurrentLanguage();
      const isDev = Boolean(import.meta.env.DEV);

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-lg backdrop-blur-xl transition-colors duration-200 dark:border-rose-500/20 dark:bg-slate-900/90 dark:shadow-2xl"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20 dark:text-rose-400">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t('somethingWentWrong', language)}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            {t('somethingWentWrongDesc', language)}
          </p>

          {isDev && this.state.error && (
            <details className="mt-4 max-h-48 w-full max-w-xl overflow-auto rounded-2xl border border-rose-300/40 bg-rose-50/50 p-4 text-left font-mono text-xs text-rose-900 dark:border-rose-500/20 dark:bg-slate-950/60 dark:text-rose-300">
              <summary className="cursor-pointer font-semibold underline">
                Developer Diagnostics ({this.state.error.name})
              </summary>
              <p className="mt-2 font-bold">{this.state.error.message}</p>
              {this.state.errorInfo?.componentStack && (
                <pre className="mt-2 whitespace-pre-wrap text-[11px] leading-relaxed text-slate-700 dark:text-slate-400">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            >
              <RefreshCw size={16} />
              {t('tryAgain', language)}
            </button>

            <button
              type="button"
              onClick={this.handleGoToDashboard}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
            >
              <Home size={16} />
              {t('backToDashboard', language)}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
