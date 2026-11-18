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
    // A lazy page chunk failed to download: usually an old copy of the page after a deploy
    // or a dropped mobile connection. Reload once to fetch the current files.
    const chunkFailed = /dynamically imported module|Importing a module script failed|error loading dynamically|Loading chunk|Failed to fetch/i
      .test(String(error?.message));
    try {
      if (chunkFailed && !sessionStorage.getItem("bonlife-chunk-reload")) {
        sessionStorage.setItem("bonlife-chunk-reload", "1");
        window.location.reload();
      }
    } catch {
      // Storage blocked: fall through to the manual refresh button.
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
          <div className="max-w-md space-y-4 rounded-3xl border border-border bg-card p-8 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bonlife</p>
            <h1 className="text-2xl font-bold">No pudimos cargar la página.</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Revise su conexión y vuelva a intentarlo. También puede escribirnos por WhatsApp al +1 (829) 987-6764.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Recargar página
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;