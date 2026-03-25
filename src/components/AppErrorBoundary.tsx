import React, { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App render failed", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
          <div className="max-w-md space-y-4 rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bonlife</p>
            <h1 className="text-2xl font-bold">Something went wrong loading the page.</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Please refresh once. If it happens again, the app will now fail gracefully instead of showing a blank screen.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Refresh page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;