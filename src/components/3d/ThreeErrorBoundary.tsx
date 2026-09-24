import React from 'react';
import { Html } from '@react-three/drei';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ThreeErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.group(`🚨 [3D Error Boundary Caught in <${this.props.name || 'Component'}>]`);
    console.error('Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default safe 3D Fallback: red warning beacon so Canvas stays intact
      return (
        <group>
          {/* Subtle red indicator box */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.8, 0.5]} />
            <meshStandardMaterial color="#ff003c" wireframe />
          </mesh>
          <Html center distanceFactor={6}>
            <div className="bg-[#05070f]/90 border border-cyber-red/80 px-3 py-1.5 rounded text-[11px] font-mono text-cyber-red shadow-[0_0_15px_rgba(255,0,60,0.5)] select-none whitespace-nowrap">
              ⚠️ {this.props.name || 'Model'} Failed to Load
            </div>
          </Html>
        </group>
      );
    }

    return this.props.children;
  }
}

export default ThreeErrorBoundary;
