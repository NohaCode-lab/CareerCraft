import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-slate-900/80 p-8 text-center backdrop-blur-xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-xl font-bold text-white">Something went wrong</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            An unexpected error occurred while rendering this section. You can refresh the view to retry.
          </p>

          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
          >
            <RefreshCw size={16} />
            Reload Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
