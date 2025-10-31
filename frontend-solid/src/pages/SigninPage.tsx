import {
  Component,
  createSignal,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { LogIn, Play, UserPlus, ArrowLeft } from "lucide-solid";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { InteractiveElement } from "../components/InteractiveElement";
import { BouncyDotsLoader } from "../components/BouncyDotsLoader";

const SigninPage: Component = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isSignUp, setIsSignUp] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal("");

  // Redirect if already authenticated
  createEffect(() => {
    if (session()) {
      navigate("/dashboard");
    }
  });

  // Background interactive bubble
  onMount(() => {
    const interBubble = document.querySelector(
      ".signin-interactive"
    ) as HTMLElement;

    if (interBubble) {
      let curX = 0;
      let curY = 0;
      let tgX = 0;
      let tgY = 0;

      function moveBg() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(moveBg);
      }

      const handleBgMouseMove = (event: MouseEvent) => {
        tgX = event.clientX;
        tgY = event.clientY;
      };

      window.addEventListener("mousemove", handleBgMouseMove);
      moveBg();

      onCleanup(() => {
        window.removeEventListener("mousemove", handleBgMouseMove);
      });
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isSignUp()) {
        // Simple sign up
        const { error } = await supabase.auth.signUp({
          email: email(),
          password: password(),
        });

        if (error) throw error;

        // Show success message and keep user on signup form
        setSuccess(
          "Registration successful! Please check your email for verification."
        );
        setError(""); // Clear any previous errors
        // Clear the form
        setEmail("");
        setPassword("");
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: email(),
          password: password(),
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
      <div class="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div class="gradients-container">
          <div class="g1"></div>
          <div class="g2"></div>
          <div class="g3"></div>
          <div class="g4"></div>
          <div class="g5"></div>
          <div class="interactive signin-interactive"></div>
        </div>
      </div>
      <main class="min-h-screen relative z-10 flex items-center justify-center p-6">
        <div class="max-w-md mx-auto">
          {/* Signin Card */}
          {!isSignUp() && (
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl">
              <div class="text-center mb-6">
                <img
                  src="/verifiedcc-logo.png"
                  alt="VerifiedCC Logo"
                  class="h-16 w-auto mx-auto mb-4 transition-transform hover:scale-110"
                />
                <h3 class="text-2xl font-bold text-deep-ocean">
                  Become Our Partner
                </h3>
                <p class="text-gray-600 mt-2">
                  Access your verified carbon credit dashboard
                </p>
                {error() && (
                  <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error()}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="partner@company.com"
                  />
                </div>

                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password()}
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="••••••••"
                  />
                </div>

                {email().trim() && password().trim() ? (
                  <InteractiveElement
                    as="button"
                    size="small"
                    backgroundStyle="full"
                    type="submit"
                    disabled={loading()}
                    class="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style="background: transparent !important;"
                  >
                    {loading() ? (
                      <div class="flex items-center justify-center">
                        <BouncyDotsLoader size="sm" className="mr-2" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <LogIn class="w-5 h-5 inline mr-2" />
                        Access Dashboard
                      </>
                    )}
                  </InteractiveElement>
                ) : (
                  <button
                    type="submit"
                    disabled={loading()}
                    class="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gray-400"
                  >
                    {loading() ? (
                      <div class="flex items-center justify-center">
                        <BouncyDotsLoader size="sm" className="mr-2" />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <LogIn class="w-5 h-5 inline mr-2" />
                        Access Dashboard
                      </>
                    )}
                  </button>
                )}
              </form>

              <div class="mt-4">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white/80 text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading()}
                  class="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading() ? (
                    <div class="flex items-center justify-center">
                      <BouncyDotsLoader size="sm" className="mr-2" />
                      Loading Demo...
                    </div>
                  ) : (
                    <>
                      <Play size={20} class="inline mr-2" />
                      Try Demo Account
                    </>
                  )}
                </button>
              </div>

              <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                  New partner?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    class="text-oasis-green hover:text-green-700 font-medium underline"
                  >
                    Sign up for partnership
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Signup Card */}
          {isSignUp() && (
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl relative">
              <div class="text-center mb-6">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  class="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 text-deep-ocean hover:text-oasis-green hover:bg-gray-50 transition-all duration-200 z-30"
                  title="Back to Sign In"
                >
                  <ArrowLeft size={20} />
                </button>
                <img
                  src="/verifiedcc-logo.png"
                  alt="VerifiedCC Logo"
                  class="h-16 w-auto mx-auto mb-4 transition-transform hover:scale-110"
                />
                <h3 class="text-2xl font-bold text-deep-ocean">
                  Become Our Partner
                </h3>
                <p class="text-gray-600 mt-2">
                  Create your verifiable carbon credit dashboard
                </p>
                {error() && (
                  <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error()}
                  </div>
                )}
                {success() && (
                  <div class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                    {success()}
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} class="space-y-6">
                <div>
                  <label
                    for="signup_email"
                    class="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="signup_email"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="partner@company.com"
                  />
                </div>

                <div>
                  <label
                    for="signup_password"
                    class="block text-sm font-medium text-deep-ocean mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup_password"
                    value={password()}
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="••••••••"
                  />
                </div>

                {email().trim() && password().trim() ? (
                  <InteractiveElement
                    as="button"
                    size="small"
                    backgroundStyle="full"
                    type="submit"
                    disabled={loading()}
                    class="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style="background: transparent !important;"
                  >
                    {loading() ? (
                      <div class="flex items-center justify-center">
                        <BouncyDotsLoader size="sm" className="mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus size={20} class="inline mr-2" />
                        Create Account
                      </>
                    )}
                  </InteractiveElement>
                ) : (
                  <button
                    type="submit"
                    disabled={loading()}
                    class="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gray-400"
                  >
                    {loading() ? (
                      <div class="flex items-center justify-center">
                        <BouncyDotsLoader size="sm" className="mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus size={20} class="inline mr-2" />
                        Create Account
                      </>
                    )}
                  </button>
                )}
              </form>

              <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    class="text-oasis-green hover:text-green-700 font-medium underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SigninPage;
