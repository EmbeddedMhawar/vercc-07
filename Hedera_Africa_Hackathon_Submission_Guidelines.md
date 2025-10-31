# Hedera Africa Hackathon 2025: Final Submission Guidelines

## Overview

This document provides highly detailed instructions for the four mandatory components required for your final project submission. Adherence to these specifics is crucial for eligibility and ensures that the judging panel can accurately and efficiently assess your project's Technology Readiness Level (TRL), technical execution on the Hedera network, and potential for real-world application in the African context.

## Objectives

Submit a complete, verifiable package that enables instant clarity for the judges on your project's value, implementation, and future viability.

---

## Submission Deadline

**Component:** All Mandatory Files  
**Deadline:** October 31, 2025, 23:59 CET (Hard limit)  
**Submission Platform:** DoraHacks BUIDL Page

**Note:** Any submission attempt after the deadline will be automatically disqualified. Late submissions will not be opened or reviewed.

---

## Mandatory Requirements

### 1. Complete DoraHacks BUIDL Profile (The Central Hub)

The DoraHacks BUIDL page is the single, centralized entry point for your project and must contain all links, team details, and essential verification information.

#### Team Registration & Roles
All team members (maximum 7) must be individually registered for the hackathon and correctly added to the BUIDL project page. Clearly list each member's primary role (e.g., Developer, Designer, Business Strategist) and contribution percentage.

#### Project Description (Structured)
The description must be broken down into clear sections covering:
- **Problem Statement:** The specific, verifiable African challenge you are solving
- **Hedera-Based Solution:** How your dApp addresses this challenge
- **Hedera Services Used:** Explicitly list every Hedera Service utilized (e.g., HTS, HCS, HSCS, DID) and how it is implemented
- **Hackathon Track:** Clearly state which of the four tracks you are competing in (e.g., Onchain Finance & RWA)

#### Hackathon Track
Clearly state which of the four tracks you are competing in (e.g., Onchain Finance & RWA). Teams must submit for only one track.

---

### 2. GitHub Repository Link (Technical Documentation)

You must submit ONE single GitHub repository link that serves as the complete technical blueprint for your project. This repository must adhere to software development best practices, ensure the code is publicly auditable, and contain all necessary documentation.

**Private repositories are an immediate disqualification.**

#### Public Visibility
The entire source code must be hosted on a public GitHub repository. Ensure all branches are accessible.

#### Additional Requirements
- Add your pitch deck and certification links inside your repository's README.md
- Invite this email as a collaborator on your GitHub repo (even if it's public): **Hackathon@hashgraph-association.com**
  - An AI system will assist the judging process and needs collaborator access to your repository in order to run properly

#### README.md (The Project Blueprint) - Required Sections

This document must provide all information needed for a judge or mentor to set up and run your project in under 10 minutes. It must include:

- **Project Title & Track**
- **Hedera Integration Summary (Detailed):**  
  A dedicated, concise paragraph for each Hedera service used, explaining the why (e.g., "We chose HCS for immutable logging of critical supply chain events because its predictable $0.0001 fee guarantees operational cost stability, which is essential for low-margin logistics in Africa.").

  This should be further detailed with:
  - **Transaction Types:** List the specific Hedera transactions executed (e.g., TokenCreateTransaction, ContractExecuteTransaction, TopicMessageSubmitTransaction)
  - **Economic Justification:** Explain how Hedera's low, predictable fees, high throughput, or ABFT finality directly support the project's financial sustainability and user adoption in Africa

- **Deployment & Setup Instructions:**  
  Clear, bulleted, and step-by-step instructions on how to clone the repo, install dependencies, configure environment variables, and run the project locally on Hedera Testnet.
  - **Running Environment:** Specify the expected local running state (e.g., "Run `npm start` to launch the React frontend on `localhost:3000` and `node server.js` for the backend.")

- **Architecture Diagram (Mandatory):**  
  A simple diagram (e.g., ASCII art or a simple linked image) showing the data flow between your Frontend (UI), Backend/Smart Contracts, and the Hedera network/Mirror Nodes. The diagram must explicitly label the flow of data to and from Hedera.

- **Deployed Hedera IDs:**  
  List all key IDs used in the Testnet deployment (e.g., Smart Contract IDs, HTS Token IDs, HCS Topic IDs, key Hedera Account IDs).

#### Security & Secrets (Critical)
- **DO NOT** commit any private keys, `.env` files, or sensitive credentials
- **Example Configuration:** Use example configuration files (`.env.example`) showing the structure of required variables
- **Judge Credentials:** Instruct the judges in your DoraHacks submission notes on how to securely access any required test credentials (e.g., "Test account ID and Private Key are provided in the DoraHacks submission text field for verification.")

#### Code Quality
- Utilize clear function names, consistent styling, and include inline comments where logic is complex, ensuring the code is easily auditable by technical judges
- **Auditability:** Ensure the core logic files (`.js`, `.sol`, `.ts`, `.py`) are clean. Projects using linters (e.g., ESLint, Prettier) and a standardized commit history will be noted positively.

---

### 3. Demonstration Video (The Proof of Concept)

The video is your chance to confirm functionality and provide a compelling, high-level overview of the user experience.

#### Requirements
- **Duration:** Maximum 3 minutes in length
- **Format:** Must be uploaded to a public platform (YouTube, Vimeo, etc.) with a single link submitted on DoraHacks. Ensure the video is high-resolution and audio is clear
- **Focus on PoC:** The video must showcase a working proof of concept (PoC) or prototype, demonstrating at least the core Hedera-integrated feature. Do not use static mockups for this section.

#### Content Flow (Minute-by-Minute Breakdown)

| Time | Section | Focus |
|------|---------|-------|
| 0:00 - 0:15 | Introduction | Team Name, Problem Statement, and Hackathon Track |
| 0:15 - 0:45 | Product Overview | Quick, narrated walkthrough of the main user interface and value proposition |
| 0:45 - 2:45 | Live Hedera Demo (The Core) | **MANDATORY:** Show the actual working product. Demonstrate a key on-chain interaction live (e.g., minting a token, sending an HCS message, executing a smart contract). Crucially, immediately switch to a Hedera Mirror Node Explorer to show the live, confirmed transaction hash. |
| 2:45 - 3:00 | Conclusion | Summarize the demonstrated impact, key Hedera components used, and the future roadmap |

---

### 4. Pitch Deck (The Business Case)

The pitch deck should be a maximum of 12-20 slides (PDF or PPT format) and must clearly articulate your project's business viability, market fit, and deep understanding of the Web3 landscape.

#### Required Slide Breakdown (Web3 Fundamentals)

| Slide | Title / Focus | Key Details to Include |
|-------|---------------|------------------------|
| 1 | Title & Vision | Project Name, Team Name, and a one-sentence, powerful value proposition |
| 2 | The Problem | Define the specific problem. Use verifiable, quantitative data. Explain why this problem is currently unsolvable or inefficiently solved |
| 3 | The Solution (The Hook) | Introduce your product/dApp. Include clear screenshots/mockups. Explain how decentralization/DLT provides a fundamental, trustless advantage |
| 4 | Why Hedera? (Technical & Strategic Advantage) | **MANDATORY:** Beyond speed and cost, detail how Hedera's unique features (e.g., ABFT finality, low, predictable fees, governance structure, ESG credentials) are a competitive advantage necessary for success |
| 5 | Market & Opportunity (TAM/SAM/SOM) | Define your target customer/user segment. Quantify the market size (Total, Serviceable, Obtainable Market). Include local market insights |
| 6 | Business & Revenue Model | How does the project generate revenue? Specify who pays, what the pricing mechanism is (fiat or token), and the financial flow |
| 7 | Tokenomics & Community (if applicable) | If using a token: detail its utility, total supply, distribution model (e.g., vesting, team allocation), and its role in governance/incentivizing network growth. If no token, detail your community growth strategy |
| 8 | Traction & Milestones | What have you quantifiably achieved during the hackathon? (e.g., GitHub commits, users onboarded during testing, mentor feedback, key Hedera features implemented) |
| 9 | Team & Expertise | Highlight core members' relevant skills (Web3, domain expertise, previous hackathon experience) and why your team is uniquely qualified to execute this in the African market |
| 10 | Roadmap & The Ask | Next 3-6 month plan (post-hackathon, focusing on Mainnet launch, first pilot, etc.). What is your specific "Ask"? (e.g., Mentorship in X area, specific grant funding amount, introduction to Y corporate partner) |
| 11-12 | Product / Architecture & TRL | High-level diagram. Highlight the Hedera integration points. State your self-assessed TRL Level (Ideation, Prototype, or MVP) (optional) |

---

## 5. Assessment Alignment: TRL and Compliance Focus

The judging process uses the Technology Readiness Level (TRL) framework to ensure projects are evaluated fairly based on their maturity.

**Pure ideation, mock-ups, or wireframes are not eligible.** All projects must submit functional code that successfully executes at least one verifiable transaction on the Hedera Testnet to pass the initial compliance gate.

### Ideation (TRL 1-3) / Proof of Concept (PoC) Minimum
- **Code Requirement:** The repository must contain deployable code demonstrating a single core Hedera Testnet transaction (e.g., HTS creation or HCS submission)
- **Focus:** The primary scoring emphasis is on the Innovation, Problem Statement, and Market Fit

### Prototype (TRL 4-6) / Working Core Feature
- **Code Requirement:** End-to-end working feature and display the transaction hash viewed on a Hedera Mirror Node Explorer
- **Focus:** The primary scoring emphasis (35%) is on Technical Execution, reliability, and architectural depth of Hedera Service utilization

---

## Final Compliance Checklist (Gate 1)

- [ ] All team members are registered on DoraHacks
- [ ] At least one team member is Hedera Certified (proof provided)
- [ ] A single, public GitHub repository link is provided
- [ ] GitHub README.md includes full setup instructions and Hedera Integration Summary
- [ ] Demonstration Video (Max 3 mins) showing a live Hedera transaction is linked
- [ ] Pitch Deck (Max 20 slides) addressing all Web3 fundamentals is uploaded
- [ ] Submission is finalized before October 31, 2025, 23:59 CET

---

## Hedera Africa Best Practices

Adherence to these requirements is essential for a valid submission. We thank you for your commitment and look forward to evaluating your projects.
