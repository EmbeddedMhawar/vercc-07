import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]">
          <div className="mb-8">
            <div className="flex justify-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-desert-sand to-oasis-green rounded-full animate-bounce"></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-oasis-green to-desert-sand rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-desert-sand to-oasis-green rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 font-['Inter',sans-serif] tracking-tight bg-gradient-to-r from-desert-sand via-oasis-green to-desert-sand bg-clip-text text-transparent animate-[gradientShift_3s_ease-in-out_infinite] bg-[length:200%_100%]">
              VerifiedCC
            </h2>
            <p className="text-gray-600 font-medium font-['Inter',sans-serif]">
              Initializing your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
