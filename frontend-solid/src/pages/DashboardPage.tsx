import { Component, createSignal, onMount, onCleanup, Show } from "solid-js";
import {
  Leaf,
  Zap,
  Battery,
  Thermometer,
  Sun,
  Activity,
  FlaskConical,
  Send,
  Play,
  StopCircle,
  Info,
  FileText,
  X,
  Wifi,
  User,
} from "lucide-solid";
import { supabase } from "../lib/supabase";
import AMSIDForm from "../components/AMSIDForm";
import ParticipantRegistration from "../components/ParticipantRegistration";

const DashboardPage: Component = () => {
  // Convert React useState to SolidJS createSignal
  const [totalCredits, setTotalCredits] = createSignal(0.0);
  const [connectionStatus, setConnectionStatus] = createSignal("Connecting...");
  const [isConnected, setIsConnected] = createSignal(false);
  const [streamStatus, setStreamStatus] = createSignal("Stopped");
  const [isStreamActive, setIsStreamActive] = createSignal(false);
  const [realDevicesCount, setRealDevicesCount] = createSignal(0);
  const [lastDataTime, setLastDataTime] = createSignal("Never");
  const [lastUpdate, setLastUpdate] = createSignal("Never");
  const [devices, setDevices] = createSignal({});

  // New state for the workflow
  const [formFilled, setFormFilled] = createSignal(false);
  const [sensorConnected, setSensorConnected] = createSignal(false);
  const [showDocumentModal, setShowDocumentModal] = createSignal(false);
  const [showSensorModal, setShowSensorModal] = createSignal(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = createSignal(false);
  const [documentData, setDocumentData] = createSignal<any>(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [showParticipantRegistration, setShowParticipantRegistration] = createSignal(false);

  // Convert React useEffect to SolidJS onMount
  onMount(() => {
    // Initialize WebSocket connection (mock for now)
    setConnectionStatus("Connected");
    setIsConnected(true);

    // Check mock status on load
    checkMockStatus();
  });

  // Close dropdown when clicking outside
  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSettingsDropdown()) {
        const target = event.target as Element;
        if (!target.closest(".settings-dropdown")) {
          setShowSettingsDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // SolidJS cleanup
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  const sendMockData = async () => {
    try {
      // Mock API call
      console.log("Sending mock data...");
      showNotification(
        "Test data sent successfully! Check your dashboard for updates.",
        "success"
      );
    } catch (error) {
      showNotification(
        "Connection error: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    }
  };

  const startMockStream = async () => {
    try {
      console.log("Starting mock stream...");
      setIsStreamActive(true);
      setStreamStatus("Active");
      showNotification(
        "Live data stream started! Generating realistic solar data every 1 second.",
        "success"
      );
    } catch (error) {
      showNotification(
        "Connection error: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    }
  };

  const stopMockStream = async () => {
    try {
      console.log("Stopping mock stream...");
      setIsStreamActive(false);
      setStreamStatus("Stopped");
      showNotification("Data stream stopped successfully.", "info");
    } catch (error) {
      showNotification(
        "Connection error: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    }
  };

  const checkMockStatus = () => {
    // Mock status check
    console.log("Checking mock status...");
  };

  const showNotification = (message: string, type: string = "info") => {
    // Simple alert for now - can be enhanced with a proper notification system
    console.log(`${type}: ${message}`);
    alert(message);
  };

  const handleDocumentSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setFormFilled(true);
      setShowDocumentModal(false);
      setIsSubmitting(false);
      showNotification("AMS-I.D Document submitted successfully!", "success");
    }, 2000);
  };

  const handleSensorConnect = () => {
    setSensorConnected(true);
    setIsConnected(true);
    setIsStreamActive(true);
    // Simulate some initial credits
    setTotalCredits(0.001234);
    setShowSensorModal(false);
    showNotification(
      "Sensor connected successfully! Data streaming started.",
      "success"
    );
  };

  const handleIssueCredit = () => {
    if (totalCredits() > 0) {
      showNotification(
        `Issued ${totalCredits().toFixed(6)} carbon credits successfully!`,
        "success"
      );
      setTotalCredits(0);
      // Reset workflow
      setFormFilled(false);
      setSensorConnected(false);
      setIsConnected(false);
      setIsStreamActive(false);
      setDocumentData(null);
    }
  };

  const handleDemoConnectSensor = () => {
    handleSensorConnect();
  };

  const handleLogout = async () => {
    try {
      // Show notification first
      showNotification("Logging out...", "info");

      // Close settings dropdown
      setShowSettingsDropdown(false);

      // Sign out from Supabase (this will trigger the auth state change in AuthContext)
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Clear all local state
      setFormFilled(false);
      setSensorConnected(false);
      setIsConnected(false);
      setIsStreamActive(false);
      setTotalCredits(0);
      setDocumentData(null);

      // AuthContext will handle navigation to signin page
    } catch (error) {
      console.error("Logout error:", error);
      showNotification("Logout failed, please try again", "error");
    }
  };

  // Helper functions for dynamic styling
  const getDocumentIconStyle = () => {
    if (!formFilled()) return { backgroundColor: "#003F5C" }; // Active: full opacity
    if (formFilled()) return { backgroundColor: "rgba(0, 63, 92, 0.7)" }; // Done: 0.7 opacity
    return { backgroundColor: "#9ca3af" }; // Inactive: gray
  };

  const getSensorIconStyle = () => {
    if (!formFilled()) return { backgroundColor: "#9ca3af" }; // Inactive: gray
    if (formFilled() && !sensorConnected())
      return { backgroundColor: "#FDB813" }; // Active: full opacity
    if (sensorConnected())
      return { backgroundColor: "rgba(253, 184, 19, 0.7)" }; // Done: 0.7 opacity
    return { backgroundColor: "#9ca3af" }; // Inactive: gray
  };

  const getCreditIconStyle = () => {
    if (!sensorConnected()) return { backgroundColor: "#9ca3af" }; // Inactive: gray
    if (sensorConnected() && totalCredits() > 0)
      return { backgroundColor: "#2E8540" }; // Active: full opacity
    if (sensorConnected() && totalCredits() === 0)
      return { backgroundColor: "rgba(46, 133, 64, 0.7)" }; // Done: 0.7 opacity
    return { backgroundColor: "#9ca3af" }; // Inactive: gray
  };

  const getDocumentButtonClass = () => {
    if (!formFilled()) return "active document-button";
    if (formFilled()) return "done document-button";
    return "inactive document-button";
  };

  const getSensorButtonClass = () => {
    if (!formFilled()) return "inactive sensor-button";
    if (formFilled() && !sensorConnected()) return "active sensor-button";
    if (sensorConnected()) return "done sensor-button";
    return "inactive sensor-button";
  };

  const getCreditButtonClass = () => {
    if (!sensorConnected()) return "inactive credit-button";
    if (sensorConnected() && totalCredits() > 0) return "active credit-button";
    if (sensorConnected() && totalCredits() === 0) return "done credit-button";
    return "inactive credit-button";
  };

  // Hero section interactive bubble (like signin page)
  onMount(() => {
    const heroSection = document.querySelector(
      ".interactive-hero"
    ) as HTMLElement;
    const interBubble = document.querySelector(
      ".hero-interactive"
    ) as HTMLElement;

    if (heroSection && interBubble) {
      let curX = 0;
      let curY = 0;
      let tgX = 0;
      let tgY = 0;
      let animationId: number;

      function moveBg() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        animationId = requestAnimationFrame(moveBg);
      }

      const handleHeroMouseMove = (event: MouseEvent) => {
        const rect = heroSection.getBoundingClientRect();
        tgX = event.clientX - rect.left;
        tgY = event.clientY - rect.top;
      };

      heroSection.addEventListener("mousemove", handleHeroMouseMove);
      moveBg();

      onCleanup(() => {
        heroSection.removeEventListener("mousemove", handleHeroMouseMove);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      });
    }
  });

  return (
    <>
      <div class="min-h-screen bg-gray-50 text-deep-ocean font-['Inter',sans-serif]">
        {/* Header */}
        <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <img
                  src="/verifiedcc-logo.png"
                  alt="VerifiedCC Logo"
                  class="h-12 w-auto"
                />
                <div>
                  <h1 class="text-2xl font-bold text-deep-ocean">
                    VerifiedCC Dashboard
                  </h1>
                  <p class="text-sm text-gray-600">
                    ESP32 Real-time Monitoring Dashboard
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div
                  class={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    isConnected()
                      ? "bg-green-100 text-oasis-green"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <div
                    class={`w-2 h-2 rounded-full mr-2 ${
                      isConnected()
                        ? "bg-oasis-green animate-pulse"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span>{connectionStatus()}</span>
                </div>

                {/* Profile Dropdown */}
                <div class="relative settings-dropdown">
                  {/* Profile Button */}
                  <button
                    onClick={() =>
                      setShowSettingsDropdown(!showSettingsDropdown())
                    }
                    class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                    title="Profile"
                  >
                    <div class="w-8 h-8 bg-oasis-green rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-bold">U</span>
                    </div>
                    <svg
                      class={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        showSettingsDropdown() ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Settings Dropdown Menu */}
                  <Show when={showSettingsDropdown()}>
                    <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                      {/* User Profile Section */}
                      <div class="px-4 py-3 border-b border-gray-100">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-oasis-green rounded-full flex items-center justify-center mr-3">
                            <span class="text-white text-lg font-bold">U</span>
                          </div>
                          <div class="flex-1">
                            <div class="font-medium text-gray-900">
                              Demo User
                            </div>
                            <div class="text-sm text-gray-500">
                              demo@verifiedcc.com
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Logout */}
                      <div class="py-1">
                        {/* Logout */}
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Logout clicked");
                            handleLogout();
                          }}
                          class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
                        >
                          <svg
                            class="w-5 h-5 text-gray-500 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span class="text-gray-700">Sign out</span>
                        </div>
                      </div>
                    </div>
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="bg-transparent">
          <div class="container mx-auto px-6 py-8">
            {/* Carbon Credits Hero Section */}
            <div class="interactive-hero relative rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl mb-8 overflow-hidden">
              {/* Hero Interactive Gradient Background (always active, different colors) */}
              <div
                class={`hero-gradient-bg ${
                  isConnected() && isStreamActive() ? "active" : "inactive"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goo-hero">
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
                <div class="hero-gradients-container">
                  <div class="hero-g1"></div>
                  <div class="hero-g2"></div>
                  <div class="hero-g3"></div>
                  <div class="hero-g4"></div>
                  <div class="hero-g5"></div>
                  <div class="interactive hero-interactive"></div>
                </div>
              </div>

              {/* Content */}
              <div class="relative z-10">
                <div class="flex items-center justify-center mb-4">
                  <Leaf
                    size={48}
                    class={`mr-4 ${isStreamActive() ? "animate-bounce" : ""}`}
                  />
                  <h2 class="text-4xl md:text-6xl font-extrabold">
                    {totalCredits().toFixed(6)} ≈{" "}
                    {(totalCredits() * 1500).toFixed(0)} $
                  </h2>
                </div>
                <p class="text-xl md:text-2xl font-medium opacity-90">
                  Total Carbon Credits Generated (tCO2)
                </p>
                <p class="text-sm opacity-75 mt-2">
                  {totalCredits() > 0
                    ? `${totalCredits().toFixed(
                        6
                      )} carbon credits available for issuance`
                    : "No carbon credits available yet"}
                </p>

                {/* Carbon Credit Calculation Display */}
                <div class="mt-6 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <p class="text-lg font-semibold">0.0001 tCO2 ≈ 150$</p>
                  <p class="text-sm opacity-90">Real-time conversion rate</p>
                </div>
              </div>
            </div>

            {/* Action Cards Section */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card 1 - Fill AMS-I.D Document */}
              <div class="action-card">
                <div class="flex items-center mb-4">
                  <div
                    class="text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg"
                    style={{
                      "background-color":
                        getDocumentIconStyle().backgroundColor,
                    }}
                  >
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-deep-ocean">
                      Fill AMS-I.D Document
                    </h3>
                    <p class="text-gray-600 text-sm">
                      Complete project registration
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">
                  Register project participants for Guardian carbon credit platform.
                </p>
                <div class="space-y-3">
                  <button
                    onClick={() => setShowParticipantRegistration(true)}
                    class="w-full text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center hover:opacity-80"
                    style={{ "background-color": "#003F5C" }}
                  >
                    <User class="w-5 h-5 mr-2" />
                    Register Participant
                  </button>
                </div>
              </div>

              {/* Card 2 - Connect Sensor */}
              <div class="action-card">
                <div class="flex items-center mb-4">
                  <div
                    class="text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg"
                    style={{
                      "background-color": getSensorIconStyle().backgroundColor,
                    }}
                  >
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-deep-ocean">
                      Connect Sensor
                    </h3>
                    <p class="text-gray-600 text-sm">Link your SCADA system</p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">
                  Connect your sensor or SCADA system to start collecting
                  real-time data.
                </p>
                <button
                  onClick={() => setShowSensorModal(true)}
                  class={`action-card-button ${getSensorButtonClass()}`}
                  disabled={!formFilled() || sensorConnected()}
                >
                  {sensorConnected() ? "Sensor Connected ✓" : "Connect Sensor"}
                </button>
              </div>

              {/* Card 3 - Issue Carbon Credit */}
              <div class="action-card">
                <div class="flex items-center mb-4">
                  <div
                    class="text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg"
                    style={{
                      "background-color": getCreditIconStyle().backgroundColor,
                    }}
                  >
                    <Leaf size={24} />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-deep-ocean">
                      Issue Carbon Credit
                    </h3>
                    <p class="text-gray-600 text-sm">
                      Generate verified credits
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">
                  Issue carbon credits based on your verified renewable energy
                  generation.
                </p>
                <button
                  onClick={handleIssueCredit}
                  class={`action-card-button ${getCreditButtonClass()}`}
                  disabled={!sensorConnected() || totalCredits() === 0}
                >
                  Issue Carbon Credit
                </button>
              </div>
            </div>

            {/* Footer */}
            <div class="text-center text-gray-500 text-sm">
              <p>
                Last updated: <span class="font-medium">{lastUpdate()}</span>
              </p>
              <p class="mt-2">
                Powered by VerifiedCC - Automating Carbon Credits with AI and
                Hedera
              </p>
            </div>
          </div>
        </main>

        {/* AMS-I.D Document Modal */}
        <Show when={showDocumentModal()}>
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDocumentModal(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AMSIDForm
                onSubmit={(data) => {
                  setDocumentData(data);
                  handleDocumentSubmit();
                }}
                onCancel={() => setShowDocumentModal(false)}
                isSubmitting={isSubmitting()}
              />
            </div>
          </div>
        </Show>

        {/* Participant Registration Modal */}
        <Show when={showParticipantRegistration()}>
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowParticipantRegistration(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ParticipantRegistration
                onSuccess={(participantId, did) => {
                  console.log("Participant registered:", participantId, did);
                  // Could add success notification here
                }}
                onCancel={() => setShowParticipantRegistration(false)}
              />
            </div>
          </div>
        </Show>

        {/* Sensor Modal */}
        <Show when={showSensorModal()}>
          <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSensorModal(false)}
          >
            <div
              class="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                  <div class="bg-oasis-green text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg">
                    <Wifi size={24} />
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-deep-ocean">
                      Connect Sensor
                    </h2>
                    <p class="text-gray-600">
                      Link your SCADA system to our platform
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSensorModal(false)}
                  class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X class="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Connection Instructions */}
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-deep-ocean mb-4">
                  Connection Instructions
                </h3>
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>
                      Configure your ESP32 or SCADA system with our API endpoint
                    </li>
                    <li>Use the provided device ID from your AMS-I.D document</li>
                    <li>
                      Set up data transmission interval (recommended: 1 minute)
                    </li>
                    <li>Test the connection using the demo button below</li>
                  </ol>
                </div>

                <div class="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <h4 class="font-semibold text-blue-900 mb-2">
                    API Configuration
                  </h4>
                  <div class="text-sm text-blue-800 font-mono bg-blue-100 p-3 rounded border">
                    <div class="mb-1">
                      <span class="font-semibold">Endpoint:</span>{" "}
                      https://api.verifiedcc.com/data
                    </div>
                    <div class="mb-1">
                      <span class="font-semibold">Project ID:</span>{" "}
                      {documentData()?.organizationName || "Complete document first"}
                    </div>
                    <div>
                      <span class="font-semibold">Method:</span> POST
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 class="font-semibold text-green-900 mb-2">
                    Sample Payload
                  </h4>
                  <pre class="text-xs text-green-800 bg-green-100 p-3 rounded border overflow-x-auto">
                    {`{
  "projectId": "${documentData()?.organizationName || "Green-Energy-Morocco"}",
  "timestamp": "2024-01-15T10:30:00Z",
  "power": 1250.5,
  "energy": 8.75,
  "temperature": 25.3,
  "irradiance": 850
}`}
                  </pre>
                </div>
              </div>

              {/* Demo Connect Button */}
              <div class="mb-6">
                <button
                  type="button"
                  onClick={handleDemoConnectSensor}
                  class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                >
                  <Activity class="w-4 h-4 mr-2" />
                  Demo Connect Sensor
                </button>
              </div>

              {/* Action Buttons */}
              <div class="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowSensorModal(false)}
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSensorConnect}
                  class="bg-desert-sand hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Connect Real Sensor
                </button>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};

export default DashboardPage;