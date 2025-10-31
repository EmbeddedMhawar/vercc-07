import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-desert-sand relative overflow-hidden flex items-center justify-center">
        {/* Noisy Blurred Background Elements */}
        <div className="absolute inset-0 blur-3xl opacity-60">
          <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400/80 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-20 right-1/3 w-48 h-48 bg-yellow-600/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-yellow-200/80 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-desert-sand/90 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-desert-sand/70 rounded-full animate-pulse" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-yellow-400/60 rounded-full animate-pulse" style={{ animationDelay: '1.8s' }}></div>
        </div>
        
        {/* Additional Noise Layer */}
        <div className="absolute inset-0 blur-2xl opacity-40">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-desert-sand rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-3/4 w-28 h-28 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-2/3 w-12 h-12 bg-desert-sand rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
