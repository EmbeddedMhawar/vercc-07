import { JSXElement, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useAuth } from "../contexts/AuthContext";
import { BouncyDotsLoader } from "./BouncyDotsLoader";

interface ProtectedRouteProps {
  children: JSXElement;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { session, loading } = useAuth();

  return (
    <Show
      when={!loading()}
      fallback={
        <div class="min-h-screen bg-desert-sand relative overflow-hidden flex items-center justify-center">
          {/* Noisy Blurred Background Elements */}
          <div class="absolute inset-0 blur-3xl opacity-60">
            <div class="absolute top-10 left-10 w-96 h-96 bg-yellow-400/80 rounded-full animate-pulse"></div>
            <div 
              class="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/70 rounded-full animate-pulse" 
              style={{ "animation-delay": "1s" }}
            ></div>
            <div 
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/60 rounded-full animate-pulse" 
              style={{ "animation-delay": "2s" }}
            ></div>
            <div 
              class="absolute top-20 right-1/3 w-48 h-48 bg-yellow-600/50 rounded-full animate-pulse" 
              style={{ "animation-delay": "0.5s" }}
            ></div>
            <div 
              class="absolute bottom-10 left-1/3 w-72 h-72 bg-yellow-200/80 rounded-full animate-pulse" 
              style={{ "animation-delay": "1.5s" }}
            ></div>
            <div 
              class="absolute top-1/4 left-1/4 w-32 h-32 bg-desert-sand/90 rounded-full animate-pulse" 
              style={{ "animation-delay": "0.8s" }}
            ></div>
            <div 
              class="absolute bottom-1/4 right-1/4 w-40 h-40 bg-desert-sand/70 rounded-full animate-pulse" 
              style={{ "animation-delay": "2.2s" }}
            ></div>
            <div 
              class="absolute top-3/4 left-3/4 w-24 h-24 bg-yellow-400/60 rounded-full animate-pulse" 
              style={{ "animation-delay": "1.8s" }}
            ></div>
          </div>
          
          {/* Additional Noise Layer */}
          <div class="absolute inset-0 blur-2xl opacity-40">
            <div class="absolute top-1/4 left-1/4 w-20 h-20 bg-desert-sand rounded-full animate-ping"></div>
            <div 
              class="absolute bottom-1/4 right-1/4 w-16 h-16 bg-yellow-500 rounded-full animate-ping" 
              style={{ "animation-delay": "1s" }}
            ></div>
            <div 
              class="absolute top-3/4 left-3/4 w-28 h-28 bg-yellow-300 rounded-full animate-ping" 
              style={{ "animation-delay": "2s" }}
            ></div>
            <div 
              class="absolute top-1/3 right-2/3 w-12 h-12 bg-desert-sand rounded-full animate-ping" 
              style={{ "animation-delay": "1.5s" }}
            ></div>
          </div>

          {/* Central Loading Indicator */}
          <div class="relative z-10 flex flex-col items-center justify-center">
            <BouncyDotsLoader size="lg" variant="desert" className="mb-4" />
            <p class="text-white text-lg font-medium drop-shadow-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <Show
        when={session()}
        fallback={<Navigate href="/signin" />}
      >
        {props.children}
      </Show>
    </Show>
  );
}