
# The modified version :
{
  "id": "urn:uuid:project-participant-uuid",
  "type": ["VerifiableCredential"],
  "issuer": "did:hedera:testnet:issuer-id",
  "issuanceDate": "2025-09-29T10:57:00.000Z",
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "schema:guardian-policy-v1"
  ],
  "credentialSubject": [
    {
      "participant_profile": {
        "summaryDescription": "Renewable power plant for grid decarbonization",           // text
        "sectoralScope": "Energy",                                                           // text/dropdown
        "projectType": "Wind",                                                               // text/dropdown
        "typeOfActivity": "Installation",                                                    // text/dropdown
        "projectScale": "Large",                                                             // text/dropdown
        "locationLatitude": 33.5731,                                                         // number
        "locationLongitude": -7.5898,                                                        // number
        "locationGeoJSON": {
          "type": "Point",
          "coordinates": [-7.5898, 33.5731]
        },                                                                                   // geojson
        "projectEligibility": "Complies with AMS-I.D.",                                      // text
        "organizationName": "Green Energy Morocco Ltd",                                      // text
        "contactPerson": "Fatima Zahra",                                                     // text
        "contactTitle": "Project Manager",                                                   // text
        "address": "123 Renewable Blvd, Casablanca",                                         // text
        "country": "Morocco",                                                                // text/dropdown
        "telephone": "+212612345678",                                                        // text/number
        "email": "contact@greenenergy.ma",                                                   // email
        "ownership": "Green Energy Morocco Ltd",                                             // text
        "emissionsTradingPrograms": "iREC",                                                  // text
        "participationOtherGHGPrograms": "None",                                             // text
        "otherEnvCredits": "No",                                                             // text/dropdown
        "rejectedOtherGHGPrograms": "No",                                                    // text/dropdown
        "methodologies": "AMS-I.D 1758892865729",                                            // text
        "startDate": "2025-01-01",                                                           // date
        "creditingPeriods": [
          {
            "start": "2025-01-01",
            "end": "2030-12-31"
          }
        ],                                                                                   // date array
        "monitoringPeriods": [
          {
            "start": "2025-01-01",
            "end": "2025-12-31"
          }
        ],                                                                                   // date array
        "monitoringPlan": "Monthly reporting to regulator",                                  // text
        "compliance": "Complies with national RE law",                                       // text
        "eligibilityCriteria": "Plant registered with national grid",                        // text
        "sustainableDevelopment": "Provides jobs, clean energy",                             // text
        "furtherInfo": "ISO 14001 Certified",                                                // text (optional)
        "EGPJ_calculation": "Greenfield power plants",                                       // dropdown
        "leakageEmissions": 0.0,                                                             // number
        "emissionReductions": 10000,                                                        // number
        "buildMargin_mostRecentYear": 2024,                                                 // number
        "buildMargin_totalSystemGen": 5000000,                                              // number

        // === Tool 07 (Electricity Systems Info) ===
        "tool_07": {
          "electricitySystemInfo": "National interconnected system",                        // text
          "hourlyOrAnnualData": "Hourly",                                                   // dropdown
          "buildMargin": {
            "mostRecentYearGen": 2024,                                                     // number
            "totalSystemGen": 5000000,                                                     // number
            "powerUnits": [
              {
                "type": "Wind",
                "commissioned": "2023-05-01",
                "generation": 400000,
                "capacity": 70
              }
            ]                                                                              // array/object
          }
        },

        // === Combined Margin / Emissions ===
        "combinedMarginBuildDataAvailable": true,                                           // bool/dropdown
        "firstCreditingPeriodData": true,                                                   // bool/dropdown
        "projectActivityType": "Wind",                                                      // dropdown
        "fossilFuelEmissions": false,                                                       // bool/dropdown
        "biomassSourceDedicatedPlantations": false,                                         // bool/dropdown
        "averageCO2_massFraction": 0.25,                                                    // number
        "averageCH4_massFraction": 0.001,                                                   // number
        "CH4_globalWarmingPotential": 28,                                                   // number
        "steamProduced": 200000,                                                            // number
        "steamEnteringPlant": 190000,                                                       // number
        "steamLeavingPlant": 185000,                                                        // number
        "workingFluidLeakedReinjected": 500,                                                // number
        "workingFluidGWP": 0,                                                               // number
        "integratedHydroProjects": false                                                    // bool/dropdown
      },
      "policyId": "68d69341152381fe552b21ec",
      "guardianVersion": "3.3.0-rc",
      "@context": [
        "schema:guardian-policy-v1"
      ],
      "type": "guardian-policy-v1"
    }
  ],
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2025-09-29T10:57:00Z",
    "verificationMethod": "did:hedera:testnet:issuer-id#did-root-key",
    "proofPurpose": "assertionMethod",
    "jws": "example-signature"
  }
}

# The real version :


Ready for General Availability? Contact us to ensure your work continues smoothly.
Schedule a Meeting Here
AMS-I.D_1758892865729
Version: (Dry Run)
Role: Administrator
VVBs

VVB approval

Project Participants

Project Participant approval

Projects

Project validation

Monitoring reports

Report approval

VPs

Trustchain

Trust Chain
Verifiable Presentation
HASH

AHHA9XsPB2Ub5dQgyYmW4EfCZuY6h1x3bPGa4RKKZ4t2

Token & Issuer
Token
b6e35194-9f22-4080-ae43-5d2cd0fa2005
Receipt Name
Virtual User 1
Token amount
0 / 0 minted
Token transfer
0 / 0 transferred
Mint date
2025-09-29T10:16:09.053Z
This Carbon Offset Claim has met all the requirements as issued in the policy secured to this token.
Verified Signature:
eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rhb0aLH5vIkx8FEFJerkDvFvcEQh5FfN7zAmrYjFA529DVwOzdTRaWjGaod0LyJKJLiequZ4zgqucmxWu1KhBQ
Policy Overview
Policy Name
AMS-I.D_1758892865729
Description
AMS-I.D
Version
Dry Run
Issuer Name
Administrator
Policy
Policy Created
Parties:
Administrator
VC File
Project
Project Created
Parties:
Virtual User 1
VC File
Project
Automatic completion of Project fields
Parties:
Virtual User 1
VC File
Project
Project Validation
Parties:
Administrator
VC File
Monitoring Report
Monitoring Report Created
Parties:
Virtual User 1
VC File
Monitoring Report
Automatic completion of MonitoringReport fields
Parties:
Virtual User 1
VC File
Monitoring Report
Monitoring Report Verified
Parties:
Virtual User 2
VC File
Monitoring Report
Monitoring Report Minted
Parties:
Administrator
VC File
Mint Token
Mint CERs
Parties:
Administrator
VC File
VP Document
 {
    "id": "urn:uuid:b2a5dc23-aa0c-462d-b478-a03a609fbbf6",
    "type": [
        "VerifiablePresentation"
    ],
    "@context": [
        "https://www.w3.org/2018/credentials/v1"
    ],
    "verifiableCredential": [
        {
            "id": "urn:uuid:50c61872-74db-444a-a8d7-6b2e9940e4db",
            "type": [
                "VerifiableCredential"
            ],
            "issuer": "did:hedera:testnet:Gs1oimvxquyRv9RLaw4sUGbcyvwuWJvH1kS2opvZkSzu_0.0.6903523",
            "issuanceDate": "2025-09-29T10:16:08.165Z",
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "schema:4259e321-7b95-4f10-9c10-29ac60bb6612"
            ],
            "credentialSubject": [
                {
                    "field0": {
                        "field0": "example",
                        "field1": "example",
                        "field2": [
                            "example"
                        ],
                        "field3": [
                            "example"
                        ],
                        "field4": "example",
                        "field5": [
                            "example"
                        ],
                        "field6": [
                            "example"
                        ],
                        "field7": [
                            {
                                "type": "Point",
                                "coordinates": [
                                    0,
                                    0
                                ]
                            }
                        ],
                        "field8": "example",
                        "field9": "example",
                        "field10": "example",
                        "field11": "example",
                        "field12": "example",
                        "field13": [
                            "example"
                        ],
                        "field14": "example",
                        "field15": "example@email.com",
                        "field16": [
                            "example"
                        ],
                        "field28": "example",
                        "field17": "example",
                        "field18": "example",
                        "field19": "example",
                        "field20": "example",
                        "field21": "2000-01-01",
                        "field22": [
                            {
                                "field0": "2000-01-01",
                                "field1": "2000-01-01"
                            }
                        ],
                        "field23": [
                            {
                                "field0": "2000-01-01",
                                "field1": "2000-01-01"
                            }
                        ],
                        "field24": "example",
                        "field25": "example",
                        "field29": [
                            "example"
                        ],
                        "field26": [
                            "example"
                        ],
                        "field27": "example"
                    },
                    "H33": {
                        "H35": "Greenfield power plants.",
                        "tool_07": {
                            "field0": "example",
                            "field1": "Hourly",
                            "field4": {
                                "field2": 1,
                                "field3": 1,
                                "field4": [
                                    {
                                        "field0": "example",
                                        "field1": "2000-01-01",
                                        "field2": 1,
                                        "field3": 1
                                    }
                                ],
                                "field0": 1
                            },
                            "field5": {
                                "field0": "Yes",
                                "field1": "Yes",
                                "field2": "Wind and Solar Power Generation",
                                "field4": {
                                    "field3": 0.25,
                                    "field2": 0.75,
                                    "field1": 1,
                                    "field0": 1
                                },
                                "field3": 1
                            },
                            "field2": {
                                "field1": "If hourly fuel consumption data is available",
                                "field0": 1
                            }
                        },
                        "H40": 1,
                        "H36": 1,
                        "H37": 1,
                        "H34": 1
                    },
                    "H81": {
                        "H82": "Renewable energy project activities.",
                        "H83": "Yes",
                        "H84": "Yes",
                        "H96": 1,
                        "H97": 1,
                        "H98": 1,
                        "H99": 1,
                        "H104": 1,
                        "H105": 1,
                        "H106": 1,
                        "H107": 1,
                        "H109": "Yes",
                        "tool_03": {
                            "field0": [
                                {
                                    "field0": "example",
                                    "field1": "example",
                                    "field2": "The CO2 emission coefficient is calculated based on the chemical composition of the fossil fuel type",
                                    "field6": 1,
                                    "field3": {
                                        "field0": "Mass",
                                        "field1": 1
                                    },
                                    "field7": 3.6666666666666665,
                                    "field8": 3.6666666666666665
                                }
                            ],
                            "field1": 3.6666666666666665
                        },
                        "power_density_integrated": {
                            "G4": 1,
                            "G5": 1,
                            "G7": 1,
                            "G8": 1,
                            "G3": 1,
                            "G6": 0
                        },
                        "H86": 3.6666666666666665,
                        "H87": 0,
                        "H110": 0,
                        "H89": 0,
                        "H95": 1,
                        "H92": 1,
                        "H102": 0,
                        "H103": 1,
                        "H101": 1,
                        "H93": 1,
                        "H91": 2,
                        "H88": 2,
                        "H85": 0
                    },
                    "H112": 1,
                    "H113": {
                        "H115": 1,
                        "H116": 0,
                        "H117": 1,
                        "H114": 0
                    },
                    "policyId": "68d69341152381fe552b21ec",
                    "guardianVersion": "3.3.0-rc",
                    "ref": "urn:uuid:0f161f81-c8c3-426a-9ce3-87d5760070d9",
                    "@context": [
                        "schema:4259e321-7b95-4f10-9c10-29ac60bb6612"
                    ],
                    "id": "urn:uuid:40bc3bbf-4ab1-4ea7-9ec7-610634788608",
                    "type": "4259e321-7b95-4f10-9c10-29ac60bb6612"
                }
            ],
            "proof": {
                "type": "Ed25519Signature2018",
                "created": "2025-09-29T10:16:08Z",
                "verificationMethod": "did:hedera:testnet:Gs1oimvxquyRv9RLaw4sUGbcyvwuWJvH1kS2opvZkSzu_0.0.6903523#did-root-key",
                "proofPurpose": "assertionMethod",
                "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..yL_PXLGO5zjnsDFON9IYDbDdv6tLPwHo0A3uDK-i2OBpOdxouSqiDhJQI-Z7Whv9fMMLTMg__5aoLQBN8MzhAw"
            }
        },
        {
            "id": "urn:uuid:3a8941b1-d3a6-4ea5-a744-c8d3ce07e37c",
            "type": [
                "VerifiableCredential"
            ],
            "issuer": "did:hedera:testnet:Gs1oimvxquyRv9RLaw4sUGbcyvwuWJvH1kS2opvZkSzu_0.0.6903523",
            "issuanceDate": "2025-09-29T10:16:09.061Z",
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "ipfs://bafybeie7ye3d35gxgky4qto4e6bdeajgdnt3a6ob2mu65ohn7pu2d5vexy"
            ],
            "credentialSubject": [
                {
                    "date": "2025-09-29T10:16:09.053Z",
                    "tokenId": "b6e35194-9f22-4080-ae43-5d2cd0fa2005",
                    "amount": "0",
                    "@context": [
                        "ipfs://bafybeie7ye3d35gxgky4qto4e6bdeajgdnt3a6ob2mu65ohn7pu2d5vexy"
                    ],
                    "type": "MintToken"
                }
            ],
            "proof": {
                "type": "Ed25519Signature2018",
                "created": "2025-09-29T10:16:09Z",
                "verificationMethod": "did:hedera:testnet:Gs1oimvxquyRv9RLaw4sUGbcyvwuWJvH1kS2opvZkSzu_0.0.6903523#did-root-key",
                "proofPurpose": "assertionMethod",
                "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..v264BFpqq-UlE6EwwVmetd8Nxh3nTERmovgJZJVlE8uYnMDzFONu0DHMSRDuEcGrKXDjfHLdt4aVdCczeeNGAw"
            }
        }
    ],
    "proof": {
        "type": "Ed25519Signature2018",
        "created": "2025-09-29T10:16:09Z",
        "verificationMethod": "did:hedera:testnet:Gs1oimvxquyRv9RLaw4sUGbcyvwuWJvH1kS2opvZkSzu_0.0.6903523#did-root-key",
        "proofPurpose": "authentication",
        "challenge": "123",
        "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..rhb0aLH5vIkx8FEFJerkDvFvcEQh5FfN7zAmrYjFA529DVwOzdTRaWjGaod0LyJKJLiequZ4zgqucmxWu1KhBQ"
    }
} 
