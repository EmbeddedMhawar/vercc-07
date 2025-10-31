import { Component, createSignal, Show } from "solid-js";
import { User, Mail, CheckCircle, AlertCircle, Loader } from "lucide-solid";

interface ParticipantRegistrationProps {
  onSuccess?: (participantId: string, did?: string) => void;
  onCancel?: () => void;
}

const ParticipantRegistration: Component<ParticipantRegistrationProps> = (props) => {
  const [participantName, setParticipantName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal(false);
  const [result, setResult] = createSignal<any>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!participantName().trim()) {
      setError("Participant name is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/participants/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participant_name: participantName().trim(),
          email: email().trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
        setSuccess(true);
        props.onSuccess?.(data.participant_id, data.did);
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setParticipantName("");
    setEmail("");
    setError("");
    setSuccess(false);
    setResult(null);
  };

  return (
    <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-2xl max-w-2xl w-full mx-4">
      {/* Header */}
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="bg-oasis-green text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg">
            <User size={24} />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-deep-ocean">
              Register Project Participant
            </h2>
            <p class="text-gray-600">
              Simple registration for Guardian carbon credit platform
            </p>
          </div>
        </div>
        <Show when={props.onCancel}>
          <button
            onClick={props.onCancel}
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Show>
      </div>

      <Show when={!success()}>
        {/* Registration Form */}
        <form onSubmit={handleSubmit} class="space-y-6">
          {/* Participant Name */}
          <div>
            <label class="block text-sm font-medium text-deep-ocean mb-2">
              Project Participant Name *
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={participantName()}
                onInput={(e) => setParticipantName(e.currentTarget.value)}
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                placeholder="Enter organization or participant name"
                required
                disabled={isSubmitting()}
              />
            </div>
          </div>

          {/* Email (Optional) */}
          <div>
            <label class="block text-sm font-medium text-deep-ocean mb-2">
              Email Address (Optional)
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                placeholder="contact@example.com"
                disabled={isSubmitting()}
              />
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Guardian will send profile completion instructions to this email
            </p>
          </div>

          {/* Error Message */}
          <Show when={error()}>
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center">
                <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
                <span class="text-red-700">{error()}</span>
              </div>
            </div>
          </Show>

          {/* Info Box */}
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start">
              <div class="bg-blue-100 text-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-1">
                <h5 class="font-semibold text-blue-800 mb-2">How it works:</h5>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li>• We create a Guardian DID (Decentralized Identifier) for you</li>
                  <li>• Guardian sends you an email with a link to complete your profile</li>
                  <li>• Your energy data gets automatically linked to your Guardian account</li>
                  <li>• Guardian handles all carbon credit calculations and verification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting() || !participantName().trim()}
            class={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
              isSubmitting() || !participantName().trim()
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-gradient-to-r from-oasis-green to-green-600 hover:from-green-600 hover:to-oasis-green text-white transform hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            <Show when={isSubmitting()}>
              <Loader class="w-5 h-5 mr-2 animate-spin" />
            </Show>
            {isSubmitting() ? "Creating Guardian DID..." : "Register Participant"}
          </button>
        </form>
      </Show>

      <Show when={success() && result()}>
        {/* Success Message */}
        <div class="text-center space-y-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <div class="flex items-center justify-center mb-4">
              <CheckCircle class="w-12 h-12 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-green-800 mb-2">
              Registration Successful!
            </h3>
            <p class="text-green-700 mb-4">
              {result().message}
            </p>
            
            <Show when={result().did}>
              <div class="bg-white rounded-lg p-4 border border-green-200">
                <p class="text-sm font-medium text-green-800 mb-2">Guardian DID Created:</p>
                <p class="text-xs font-mono text-green-600 break-all">
                  {result().did}
                </p>
              </div>
            </Show>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-blue-800 mb-2">Next Steps:</h4>
            <ul class="text-sm text-blue-700 text-left space-y-1">
              <li>• Check your email for Guardian profile completion instructions</li>
              <li>• Complete your project details in the Guardian platform</li>
              <li>• Your ESP32 energy data will be automatically linked to your account</li>
              <li>• Guardian will handle carbon credit calculations and verification</li>
            </ul>
          </div>

          <button
            onClick={resetForm}
            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Register Another Participant
          </button>
        </div>
      </Show>
    </div>
  );
};

export default ParticipantRegistration;