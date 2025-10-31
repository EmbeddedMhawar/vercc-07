import { Component } from "solid-js";

interface BouncyDotsLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "desert" | "white";
}

export const BouncyDotsLoader: Component<BouncyDotsLoaderProps> = (props) => {
  const size = props.size || "md";
  const variant = props.variant || "white";

  // Simple 3 dots with bounce animation
  const dotColor = variant === "desert" ? "bg-desert-sand" : "bg-white";
  const dotSize =
    size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5";
  const gap = size === "sm" ? "gap-1" : size === "lg" ? "gap-2" : "gap-1.5";

  return (
    <div class={`flex items-center ${gap} ${props.className || ""}`}>
      <div
        class={`${dotSize} ${dotColor} rounded-full animate-bounce`}
        style="animation-delay: 0s;"
      />
      <div
        class={`${dotSize} ${dotColor} rounded-full animate-bounce`}
        style="animation-delay: 0.1s;"
      />
      <div
        class={`${dotSize} ${dotColor} rounded-full animate-bounce`}
        style="animation-delay: 0.2s;"
      />
    </div>
  );
};
