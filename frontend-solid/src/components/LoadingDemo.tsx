import { Component } from "solid-js";
import { BouncyDotsLoader } from "./BouncyDotsLoader";

export const LoadingDemo: Component = () => {
  return (
    <div class="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold text-center text-deep-ocean mb-8">
        Bouncy Noisy Desert Yellow Dots Loading States
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Small Size */}
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-deep-ocean">Small Size</h2>
          <div class="flex items-center justify-center py-8">
            <BouncyDotsLoader size="sm" />
          </div>
          <p class="text-gray-600 text-center">
            Perfect for inline loading states
          </p>
        </div>

        {/* Medium Size */}
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-deep-ocean">
            Medium Size
          </h2>
          <div class="flex items-center justify-center py-8">
            <BouncyDotsLoader size="md" />
          </div>
          <p class="text-gray-600 text-center">
            Great for button loading states
          </p>
        </div>

        {/* Large Size */}
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-deep-ocean">Large Size</h2>
          <div class="flex items-center justify-center py-8">
            <BouncyDotsLoader size="lg" />
          </div>
          <p class="text-gray-600 text-center">
            Ideal for page loading screens
          </p>
        </div>
      </div>

      {/* Button Examples */}
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-deep-ocean">
          In Button Examples
        </h2>
        <div class="flex flex-wrap gap-4">
          <button class="bg-desert-sand hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center">
            <BouncyDotsLoader size="sm" className="mr-2" />
            Signing In...
          </button>

          <button class="bg-oasis-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center">
            <BouncyDotsLoader size="sm" className="mr-2" />
            Creating Account...
          </button>

          <button class="bg-deep-ocean hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center">
            <BouncyDotsLoader size="sm" className="mr-2" />
            Loading Demo...
          </button>
        </div>
      </div>

      {/* Dark Background Example */}
      <div class="bg-deep-ocean p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-white">
          On Dark Background
        </h2>
        <div class="flex items-center justify-center py-8">
          <BouncyDotsLoader size="lg" />
        </div>
        <p class="text-gray-300 text-center">
          The desert yellow dots pop beautifully on dark backgrounds
        </p>
      </div>
    </div>
  );
};
