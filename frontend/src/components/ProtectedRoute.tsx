import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]">
          <div className="mb-8">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-oasis-green to-desert-sand rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-desert-sand to-oasis-green rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-oasis-green to-desert-sand rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 font-['Inter',sans-serif] tracking-tight bg-gradient-to-r from-oasis-green via-desert-sand to-oasis-green bg-clip-text text-transparent animate-[gradientShift_3s_ease-in-out_infinite] bg-[length:200%_100%]">
              Authenticating
            </h2>
            <p className="text-gray-600 font-medium font-['Inter',sans-serif]">
              Verifying your credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
