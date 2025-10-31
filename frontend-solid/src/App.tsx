import { Router, Route } from "@solidjs/router";
import { Component, Show, lazy, Suspense } from "solid-js";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BouncyDotsLoader } from "./components/BouncyDotsLoader";

// Lazy load pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const AppContent: Component = () => {
  const { loading } = useAuth();

  return (
    <Show
      when={!loading()}
      fallback={
        <div class="min-h-screen bg-desert-sand relative overflow-hidden flex items-center justify-center">
          {/* Noisy Blurred Background Elements */}
          <div class="absolute inset-0 blur-3xl opacity-60">
            <div class="absolute top-10 left-10 w-96 h-96 bg-yellow-400/80 rounded-full animate-pulse"></div>
            <div class="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/70 rounded-full animate-pulse"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/60 rounded-full animate-pulse"></div>
          </div>
          
          <div class="relative z-10 flex flex-col items-center justify-center opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
            <div class="mb-8">
              <BouncyDotsLoader size="lg" variant="desert" />
            </div>

            <div class="text-center">
              <h2 class="text-2xl font-bold mb-2 font-['Inter',sans-serif] tracking-tight text-white drop-shadow-lg">
                VerifiedCC
              </h2>
              <p class="text-white/90 font-medium font-['Inter',sans-serif] drop-shadow">
                Initializing your dashboard...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <Suspense fallback={
        <div class="min-h-screen bg-desert-sand relative overflow-hidden flex items-center justify-center">
          <div class="absolute inset-0 blur-2xl opacity-40">
            <div class="absolute top-1/4 left-1/4 w-20 h-20 bg-yellow-400 rounded-full animate-ping"></div>
            <div class="absolute bottom-1/4 right-1/4 w-16 h-16 bg-yellow-500 rounded-full animate-ping"></div>
          </div>
          
          <div class="relative z-10 text-center opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
            <div class="mb-4">
              <BouncyDotsLoader size="md" variant="desert" />
            </div>
            <p class="text-white text-sm font-medium font-['Inter',sans-serif] drop-shadow">
              Loading...
            </p>
          </div>
        </div>
      }>
        <Route path="/" component={LandingPage} />
        <Route path="/signin" component={SigninPage} />
        <Route
          path="/dashboard"
          component={() => (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
      </Suspense>
    </Show>
  );
};

const App: Component = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;