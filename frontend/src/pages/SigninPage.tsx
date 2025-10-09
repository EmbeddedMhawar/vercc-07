import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, PlayCircle, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import InteractiveGradientBackground from "../components/InteractiveGradientBackground";

export default function SigninPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Simple sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        alert(
          "Registration successful! Please check your email for verification."
        );
        setIsSignUp(false);
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Try to sign in with demo credentials
      const { error } = await supabase.auth.signInWithPassword({
        email: "demo@gmail.com",
        password: "verifiedcc",
      });

      if (error) {
        // If demo user doesn't exist, show helpful message
        if (error.message.includes("Invalid login credentials")) {
          setError(
            "Demo user not found. Please create a demo user in your Supabase dashboard with email: demo@gmail.com and password: verifiedcc"
          );
        } else {
          throw error;
        }
      }

      // AuthContext will automatically redirect to dashboard
    } catch (error: any) {
      setError(error.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InteractiveGradientBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl">
            <div className="text-center mb-6">
              <img
                src="/verifiedcc-logo.png"
                alt="VerifiedCC Logo"
                className="h-16 w-auto mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-deep-ocean">
                {isSignUp ? "Become Our Partner" : "Become Our Partner"}
              </h3>
              <p className="text-gray-600 mt-2">
                {isSignUp
                  ? "Partner Registration"
                  : "Access Guardian Verifiable Credentials Portal"}
              </p>
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>

            {!isSignUp ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="partner@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Demo credentials:{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      demo@gmail.com
                    </code>{" "}
                    /{" "}
                    <code className="bg-gray-100 px-1 rounded">verifiedcc</code>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-oasis-green to-desert-sand text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 inline mr-2" />
                      Access Dashboard
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="signup_email"
                    className="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="signup_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="partner@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup_password"
                    className="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup_password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-oasis-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 inline mr-2" />
                        Create Account
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {!isSignUp && (
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/80 text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Loading Demo...
                    </div>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5 inline mr-2" />
                      Try Demo Account
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? "Already have an account?" : "New partner?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-oasis-green hover:text-green-700 font-medium underline"
                >
                  {isSignUp ? "Sign in here" : "Sign up for partnership"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
