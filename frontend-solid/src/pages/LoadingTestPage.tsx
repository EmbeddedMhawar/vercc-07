import { Component } from 'solid-js';
import { BouncyDotsLoader } from '../components/BouncyDotsLoader';

const LoadingTestPage: Component = () => {
  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 class="text-3xl font-bold mb-8 text-deep-ocean">Loading Test Page</h1>
      
      <div class="space-y-8">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4">White Leaf - CSS-Only Animation</h2>
          <div class="py-6 flex justify-center">
            <BouncyDotsLoader size="md" variant="white" />
          </div>
          <p class="text-gray-600 text-center text-sm">Moving leaf travels across static dots</p>
        </div>

        <div class="bg-desert-sand p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-white">Desert Leaf - With Green Stem</h2>
          <div class="py-6 flex justify-center">
            <BouncyDotsLoader size="md" variant="desert" />
          </div>
          <p class="text-white text-center text-sm">Yellow leaf with green stem and glow effects</p>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-white">Size Comparison</h2>
          <div class="space-y-6">
            <div class="flex items-center gap-6">
              <span class="text-white text-sm w-16">Small:</span>
              <BouncyDotsLoader size="sm" variant="white" />
              <span class="text-gray-400 text-xs">32x16px</span>
            </div>
            <div class="flex items-center gap-6">
              <span class="text-white text-sm w-16">Medium:</span>
              <BouncyDotsLoader size="md" variant="white" />
              <span class="text-gray-400 text-xs">40x20px</span>
            </div>
            <div class="flex items-center gap-6">
              <span class="text-white text-sm w-16">Large:</span>
              <BouncyDotsLoader size="lg" variant="white" />
              <span class="text-gray-400 text-xs">48x24px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test the ProtectedRoute loading screen */}
      <div class="mt-8 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Simulated Loading Screen</h2>
        <div class="min-h-96 bg-desert-sand relative overflow-hidden flex items-center justify-center rounded-lg">
          {/* Noisy Blurred Background Elements */}
          <div class="absolute inset-0 blur-3xl opacity-60">
            <div class="absolute top-10 left-10 w-96 h-96 bg-yellow-400/80 rounded-full animate-pulse"></div>
            <div class="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/70 rounded-full animate-pulse"></div>
          </div>
          
          {/* Central Loading Indicator */}
          <div class="relative z-10 flex flex-col items-center justify-center">
            <BouncyDotsLoader size="lg" variant="desert" className="mb-4" />
            <p class="text-white text-lg font-medium drop-shadow-lg">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTestPage;