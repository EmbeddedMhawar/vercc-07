import { Component, createSignal, Show, For } from "solid-js";
import {
  FileText,
  MapPin,
  Calculator,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Zap,
  X,
  Upload,
} from "lucide-solid";

interface ParticipantProfile {
  summaryDescription: string;
  organizationName: string;
  contactPerson: string;
  contactTitle: string;
  email: string;
  telephone: string;
  projectType: string;
  projectScale: string;
  sectoralScope: string;
  address: string;
  country: string;
  locationLatitude: number;
  locationLongitude: number;
  locationGeoJSON: { type: string; coordinates: number[] };
  monitoringPlan: string;
  emissionReductions: number;
  compliance: string;
  averageCO2_massFraction: number;
  CH4_globalWarmingPotential: number;
  leakageEmissions: number;
  sustainableDevelopment: string;
  furtherInfo: string;
  tool_07: {
    electricitySystemInfo: string;
    hourlyOrAnnualData: string;
    buildMargin: {
      totalSystemGen: number;
      mostRecentYearGen: number;
    };
  };
}

interface AMSIDFormProps {
  onSubmit: (data: ParticipantProfile) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const AMSIDForm: Component<AMSIDFormProps> = (props) => {
  const [currentStep, setCurrentStep] = createSignal(1);
  const [validationErrors, setValidationErrors] = createSignal<string[]>([]);

  // Participant profile state
  const [participantProfile, setParticipantProfile] =
    createSignal<ParticipantProfile>({
      summaryDescription: "",
      organizationName: "",
      contactPerson: "",
      contactTitle: "",
      email: "",
      telephone: "",
      projectType: "Wind",
      projectScale: "Large",
      sectoralScope: "Energy",
      address: "",
      country: "Morocco",
      locationLatitude: 0,
      locationLongitude: 0,
      locationGeoJSON: { type: "Point", coordinates: [0, 0] },
      monitoringPlan: "",
      emissionReductions: 0,
      compliance: "",
      averageCO2_massFraction: 0,
      CH4_globalWarmingPotential: 0,
      leakageEmissions: 0,
      sustainableDevelopment: "",
      furtherInfo: "",
      tool_07: {
        electricitySystemInfo: "",
        hourlyOrAnnualData: "Hourly",
        buildMargin: {
          totalSystemGen: 0,
          mostRecentYearGen: 0,
        },
      },
    });

  const fillDemoData = () => {
    setParticipantProfile({
      summaryDescription: "Renewable power plant for grid decarbonization",
      organizationName: "Green Energy Morocco Ltd",
      contactPerson: "Fatima Zahra",
      contactTitle: "Project Manager",
      email: "contact@greenenergy.ma",
      telephone: "+212612345678",
      projectType: "Wind",
      projectScale: "Large",
      sectoralScope: "Energy",
      address: "123 Renewable Blvd, Casablanca",
      country: "Morocco",
      locationLatitude: 33.5731,
      locationLongitude: -7.5898,
      locationGeoJSON: { type: "Point", coordinates: [-7.5898, 33.5731] },
      monitoringPlan: "Monthly reporting to regulator",
      emissionReductions: 10000,
      compliance: "Complies with national RE law",
      averageCO2_massFraction: 0.25,
      CH4_globalWarmingPotential: 28,
      leakageEmissions: 0.0,
      sustainableDevelopment: "Provides jobs, clean energy",
      furtherInfo: "ISO 14001 Certified",
      tool_07: {
        electricitySystemInfo: "National interconnected system",
        hourlyOrAnnualData: "Hourly",
        buildMargin: {
          totalSystemGen: 5000000,
          mostRecentYearGen: 2024,
        },
      },
    });
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep() < 4) {
        setCurrentStep(currentStep() + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep() > 1) {
      setCurrentStep(currentStep() - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: string[] = [];
    const profile = participantProfile();

    switch (currentStep()) {
      case 1:
        if (!profile.summaryDescription)
          errors.push("Summary description is required");
        if (!profile.organizationName)
          errors.push("Organization name is required");
        if (!profile.contactPerson) errors.push("Contact person is required");
        if (!profile.email) errors.push("Email is required");
        break;
      case 2:
        if (!profile.address) errors.push("Address is required");
        if (!profile.monitoringPlan) errors.push("Monitoring plan is required");
        break;
      case 3:
        if (!profile.tool_07.electricitySystemInfo)
          errors.push("Electricity system info is required");
        if (profile.emissionReductions <= 0)
          errors.push("Emission reductions must be greater than 0");
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      props.onSubmit(participantProfile());
    }
  };

  return (
    <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="bg-deep-ocean text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg">
            <FileText size={24} />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-deep-ocean">
              AMS-I.D Guardian VC Document
            </h2>
            <p class="text-gray-600">
              Grid-connected Renewable Electricity Generation
            </p>
          </div>
        </div>
        <button
          onClick={props.onCancel}
          class="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X class="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Progress Steps */}
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-deep-ocean">
            Project Registration Steps
          </h3>
          <button
            onClick={fillDemoData}
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Zap class="w-4 h-4 mr-2" />
            Fill Demo Data
          </button>
        </div>

        <div class="flex items-center space-x-4 mb-6">
          <For each={[1, 2, 3, 4]}>
            {(step) => (
              <div class="flex items-center">
                <div
                  class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    currentStep() >= step ? "bg-oasis-green" : "bg-gray-300"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    class={`w-12 h-1 ${
                      currentStep() > step ? "bg-oasis-green" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            )}
          </For>
        </div>

        <div class="flex space-x-4 text-xs text-gray-600">
          <span class={currentStep() === 1 ? "font-bold text-oasis-green" : ""}>
            Basic Info
          </span>
          <span class={currentStep() === 2 ? "font-bold text-oasis-green" : ""}>
            Location & Technical
          </span>
          <span class={currentStep() === 3 ? "font-bold text-oasis-green" : ""}>
            Tool 07 & Calculations
          </span>
          <span class={currentStep() === 4 ? "font-bold text-oasis-green" : ""}>
            Review & Submit
          </span>
        </div>
      </div>

      {/* Validation Errors */}
      <Show when={validationErrors().length > 0}>
        <div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
            <h4 class="font-semibold text-red-800">
              Please fix the following errors:
            </h4>
          </div>
          <ul class="list-disc list-inside text-red-700 text-sm">
            <For each={validationErrors()}>{(error) => <li>{error}</li>}</For>
          </ul>
        </div>
      </Show>

      {/* Form Content */}
      <div class="bg-gray-50 rounded-xl p-6 mb-6">
        {/* Step 1: Basic Project Information */}
        <Show when={currentStep() === 1}>
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <FileText class="w-8 h-8 text-oasis-green mr-3" />
              <h3 class="text-xl font-bold text-deep-ocean">
                Basic Project Information
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Project Summary Description *
                </label>
                <textarea
                  value={participantProfile().summaryDescription}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      summaryDescription: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  rows={3}
                  placeholder="Describe your renewable energy project..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={participantProfile().organizationName}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      organizationName: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="Your organization name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={participantProfile().contactPerson}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      contactPerson: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Contact Title
                </label>
                <input
                  type="text"
                  value={participantProfile().contactTitle}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      contactTitle: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="Job title"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={participantProfile().email}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      email: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={participantProfile().telephone}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      telephone: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Sectoral Scope *
                </label>
                <select
                  value={participantProfile().sectoralScope}
                  onChange={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      sectoralScope: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                >
                  <option value="Energy">Energy</option>
                  <option value="Transport">Transport</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Project Type *
                </label>
                <select
                  value={participantProfile().projectType}
                  onChange={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      projectType: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                >
                  <option value="Wind">Wind</option>
                  <option value="Solar">Solar</option>
                  <option value="Hydro">Hydro</option>
                  <option value="Biomass">Biomass</option>
                </select>
              </div>
            </div>
          </div>
        </Show>

        {/* Step 2: Location & Technical Details */}
        <Show when={currentStep() === 2}>
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <MapPin class="w-8 h-8 text-oasis-green mr-3" />
              <h3 class="text-xl font-bold text-deep-ocean">
                Location & Technical Details
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={participantProfile().address}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      address: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="Full project address"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Country
                </label>
                <select
                  value={participantProfile().country}
                  onChange={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      country: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                >
                  <option value="Morocco">Morocco</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Algeria">Algeria</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Project Scale
                </label>
                <select
                  value={participantProfile().projectScale}
                  onChange={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      projectScale: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={participantProfile().locationLatitude}
                  onInput={(e) => {
                    const lat = parseFloat(e.currentTarget.value);
                    setParticipantProfile({
                      ...participantProfile(),
                      locationLatitude: lat,
                      locationGeoJSON: {
                        type: "Point",
                        coordinates: [
                          participantProfile().locationLongitude,
                          lat,
                        ],
                      },
                    });
                  }}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={participantProfile().locationLongitude}
                  onInput={(e) => {
                    const lng = parseFloat(e.currentTarget.value);
                    setParticipantProfile({
                      ...participantProfile(),
                      locationLongitude: lng,
                      locationGeoJSON: {
                        type: "Point",
                        coordinates: [
                          lng,
                          participantProfile().locationLatitude,
                        ],
                      },
                    });
                  }}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Monitoring Plan *
                </label>
                <textarea
                  value={participantProfile().monitoringPlan}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      monitoringPlan: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  rows={3}
                  placeholder="Describe your monitoring plan..."
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Compliance Statement
                </label>
                <textarea
                  value={participantProfile().compliance}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      compliance: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  rows={2}
                  placeholder="Compliance with regulations..."
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Step 3: Tool 07 & Calculations */}
        <Show when={currentStep() === 3}>
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <Calculator class="w-8 h-8 text-oasis-green mr-3" />
              <h3 class="text-xl font-bold text-deep-ocean">
                Tool 07 & Emission Calculations
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Electricity System Information
                </label>
                <input
                  type="text"
                  value={participantProfile().tool_07.electricitySystemInfo}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      tool_07: {
                        ...participantProfile().tool_07,
                        electricitySystemInfo: e.currentTarget.value,
                      },
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  placeholder="National interconnected system"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Data Availability
                </label>
                <select
                  value={participantProfile().tool_07.hourlyOrAnnualData}
                  onChange={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      tool_07: {
                        ...participantProfile().tool_07,
                        hourlyOrAnnualData: e.currentTarget.value,
                      },
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Most Recent Year Generation
                </label>
                <input
                  type="number"
                  value={
                    participantProfile().tool_07.buildMargin.mostRecentYearGen
                  }
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      tool_07: {
                        ...participantProfile().tool_07,
                        buildMargin: {
                          ...participantProfile().tool_07.buildMargin,
                          mostRecentYearGen: parseInt(e.currentTarget.value),
                        },
                      },
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Total System Generation (MWh)
                </label>
                <input
                  type="number"
                  value={
                    participantProfile().tool_07.buildMargin.totalSystemGen
                  }
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      tool_07: {
                        ...participantProfile().tool_07,
                        buildMargin: {
                          ...participantProfile().tool_07.buildMargin,
                          totalSystemGen: parseInt(e.currentTarget.value),
                        },
                      },
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Emission Reductions (tCO2/year)
                </label>
                <input
                  type="number"
                  value={participantProfile().emissionReductions}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      emissionReductions: parseInt(e.currentTarget.value),
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Average CO2 Mass Fraction
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={participantProfile().averageCO2_massFraction}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      averageCO2_massFraction: parseFloat(
                        e.currentTarget.value
                      ),
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  CH4 Global Warming Potential
                </label>
                <input
                  type="number"
                  value={participantProfile().CH4_globalWarmingPotential}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      CH4_globalWarmingPotential: parseInt(
                        e.currentTarget.value
                      ),
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Leakage Emissions (tCO2/year)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={participantProfile().leakageEmissions}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      leakageEmissions: parseFloat(e.currentTarget.value),
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Step 4: Review & Submit */}
        <Show when={currentStep() === 4}>
          <div class="space-y-6">
            <div class="flex items-center mb-6">
              <BarChart3 class="w-8 h-8 text-oasis-green mr-3" />
              <h3 class="text-xl font-bold text-deep-ocean">Review & Submit</h3>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div class="flex items-center mb-4">
                <CheckCircle class="w-6 h-6 text-green-600 mr-2" />
                <h4 class="font-semibold text-green-800">Project Summary</h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium">Organization:</span>{" "}
                  {participantProfile().organizationName}
                </div>
                <div>
                  <span class="font-medium">Project Type:</span>{" "}
                  {participantProfile().projectType}
                </div>
                <div>
                  <span class="font-medium">Location:</span>{" "}
                  {participantProfile().country}
                </div>
                <div>
                  <span class="font-medium">Expected Reductions:</span>{" "}
                  {participantProfile().emissionReductions} tCO2/year
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Sustainable Development Benefits
                </label>
                <textarea
                  value={participantProfile().sustainableDevelopment}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      sustainableDevelopment: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  rows={3}
                  placeholder="Describe sustainable development benefits..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-deep-ocean mb-2">
                  Additional Information
                </label>
                <textarea
                  value={participantProfile().furtherInfo}
                  onInput={(e) =>
                    setParticipantProfile({
                      ...participantProfile(),
                      furtherInfo: e.currentTarget.value,
                    })
                  }
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors"
                  rows={3}
                  placeholder="Any additional information..."
                />
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 class="font-semibold text-blue-800 mb-4">
                Generated Verifiable Credential Preview
              </h4>
              <pre class="text-xs text-blue-700 bg-blue-100 p-4 rounded border overflow-x-auto max-h-40">
                {JSON.stringify(
                  {
                    id: "urn:uuid:project-participant-uuid",
                    type: ["VerifiableCredential"],
                    issuer: "did:hedera:testnet:issuer-id",
                    credentialSubject: [
                      {
                        participant_profile: {
                          summaryDescription:
                            participantProfile().summaryDescription,
                          organizationName:
                            participantProfile().organizationName,
                          projectType: participantProfile().projectType,
                          emissionReductions:
                            participantProfile().emissionReductions,
                        },
                      },
                    ],
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </Show>
      </div>

      {/* Navigation Buttons */}
      <div class="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep() === 1}
          class={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep() === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          Previous
        </button>

        <div class="flex space-x-4">
          <Show when={currentStep() < 4}>
            <button
              onClick={nextStep}
              class="bg-oasis-green hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Next Step
            </button>
          </Show>

          <Show when={currentStep() === 4}>
            <button
              onClick={handleSubmit}
              disabled={props.isSubmitting}
              class={`px-8 py-3 rounded-lg font-medium transition-colors ${
                props.isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-desert-sand hover:bg-yellow-500"
              } text-white flex items-center`}
            >
              {props.isSubmitting ? (
                <>
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Upload class="w-4 h-4 mr-2" />
                  Submit to Guardian
                </>
              )}
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default AMSIDForm;
