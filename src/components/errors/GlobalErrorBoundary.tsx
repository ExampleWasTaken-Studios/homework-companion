import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorView } from "../../views/ErrorView";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("hasError:", this.state.hasError);
    // Log error here
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorView />;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;