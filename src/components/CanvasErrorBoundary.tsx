import { Component, type ReactNode } from 'react';
import { WebGLFallback } from './WebGLFallback';

interface CanvasErrorBoundaryProps {
  children: ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL scene failed gracefully:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return <WebGLFallback />;
    }

    return this.props.children;
  }
}
