# Explain **aggregateDocumentBlock**

The **aggregateDocumentBlock** in Hedera Guardian's policy workflow is a block used to **aggregate (combine and process) documents** according to specific rules in the policy workflow. Here’s a breakdown of the main aspects:

**Purpose**

- Takes a document or an array of documents as input.
- Outputs an array of documents once a reporting period is over or a set condition is met.

**Key Properties**

- **tag:** Unique name for the logic block (e.g., "aggregateDocumentBlock").
- **permissions:** Defines which entity can interact at this step (e.g., Standard Registry).
- **defaultActive:** Indicates if the block is currently active.
- **On errors:** Configures what to do if there’s a system error (no action, retry, go to step, or go to a tag).
- **stopPropagation:** If checked, ends workflow processing here—doesn't pass to the next block.
- **GroupByFields:** Lets you group documents by additional fields (always grouped by user by default).
- **AggregateType:** Can be *Cumulative Dimension* (uses expressions, calculations, and conditions) or *Period* (uses a timer for the aggregation period).
    - For *Cumulative Dimension*: You can set expressions (calculated variables) and conditions for advanced logic.
    - For *Period*: Includes a timer object; a flag can make the timer trigger even with no data.

**Events**

- Can define input and output events, specifying which blocks send or receive the events and which actor (initiator, owner, issuer) they relate to.
- Events can be enabled or disabled.

**Deprecated or Cancelled UI Fields**

- UI fields like **Rule** and **Threshold** are marked as cancelled (deprecated/not in use).

**Typical Use Case**

- This block is used when you need to collect, group, and process documents periodically or based on custom conditions—common in reporting or compliance workflows in blockchain-based environmental or regulatory applications.

**Summary Table Example**


| Property | Definition | Example |
| :-- | :-- | :-- |
| tag | Unique name | aggregateDocumentBlock |
| permissions | Who can interact | Standard Registry |
| defaultActive | Is this block active | Checked |
| GroupByFields | Additional grouping fields | Field Path |
| AggregateType | Cumulative Dimension / Period | Cumulative Dimension |

In essence, **aggregateDocumentBlock** is a flexible building block for grouping and processing documents within a Guardian policy workflow, customizable via its properties to fit various business logic or compliance needs.
<span style="display:none">[^2_1]</span>

<div align="center">⁂</div>

[^2_1]: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/aggregatedocumentblock.md


---

# I want to use iot data is **aggregateDocumentBlock** a good use case for this

Yes, **using IoT data is a good use case for the aggregateDocumentBlock**. Here’s why:

- **Purpose Fit:** The aggregateDocumentBlock is designed to take incoming documents (your IoT data readings, which can be sent as documents to Guardian) and aggregate them based on logical rules or time windows. This is exactly what you need if you are collecting data from multiple IoT sensors and want to combine their outputs for reporting, compliance, or triggering some blockchain-based issuance or validation.
- **How It Might Work:**
    - Each IoT device (or group) periodically pushes data to Guardian, where each datapoint (e.g., energy produced, temperature, CO2 level) is a document.
    - You can set **aggregation logic**—for example, sum totals, average values, detect threshold events, or group by device/location/user.
    - Use the **cumulative dimension** to set up formulas, calculated variables, and custom conditions for sophisticated logic.
    - Or use the **period** setting to collect and process all data within a certain time frame (e.g. hourly/daily aggregation).
    - Include grouping—for example, aggregate by user, device, or custom fields from the IoT payload.
- **Typical Example:** If your IoT sensors report renewable energy production every 5 minutes, you could use this block to aggregate all readings per day or per project, calculate total energy produced, and then use the result to issue a blockchain certificate, mint a token, or trigger compliance checks—all using Guardian’s workflow.
- **Events:** You can configure the block to trigger downstream actions or notifications once data is aggregated (such as approving a claim, issuing a credential/token, etc.).

**Summary:**
If your goal is to collect, combine, and process multiple IoT data documents to produce actionable or auditable outputs on Guardian, the aggregateDocumentBlock is **specifically designed for this kind of workflow** and supports both simple and complex aggregation logic. It is a best practice to use it for IoT data pipelines within Guardian.
<span style="display:none">[^3_1]</span>

<div align="center">⁂</div>

[^3_1]: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/aggregatedocumentblock.md


---
# What about ** externalDataBlock** 

The **externalDataBlock** (External Data Workflow Block) in Hedera Guardian is specifically designed to receive data from external sources (such as outside APIs or IoT devices) and pass it into the Guardian policy workflow.

**Key Properties:**

- **type:** Always `externalData` (can’t be changed). This block is for bringing in data from outside sources.
- **tag:** Unique block name to identify it in your workflow (e.g., `mrv_source`).
- **permissions:** Defines which entity (such as Installer, Device Manager, etc.) has rights to interact with this block.
- **defaultActive:** Whether the block starts active by default.
- **entityType:** Specifies what type of entity the block is set up for (commonly MRV – Monitoring, Reporting, and Verification for sustainability).
- **schema:** Lets you select which data schema applies (your data structure/template for incoming external data).
- **dependencies (deprecated):** You can ignore this—currently not in use.

**Events:**

- You can configure events that trigger when new data is ingested:
    - **Event type:** Input or output, to pass control or trigger actions in your workflow.
    - **Source and Target:** Which blocks send/receive events.
    - **Actor:** Who carries out or owns the event (e.g., initiator, owner, issuer).
    - **Disabled:** You can disable an event temporarily.

**Typical Usage:**

- This block is purpose-built for use cases like **IoT data ingestion**—for example, if you want to stream live sensor data (e.g., energy meters, environmental sensors) directly into a Guardian policy. The externalDataBlock can serve as the “entry point” for that data and routes it onward for processing, aggregation, or validation.

**Summary:**
If you want to **bring raw IoT data into your Guardian policy**, the externalDataBlock is the official block to start the data pipeline. After data is ingested with this block, you can then use blocks like aggregateDocumentBlock to combine, analyze, or take action on that data. It is especially relevant for automated and real-time integrations (such as sensor or device data).
<span style="display:none">[^4_1]</span>

<div align="center">⁂</div>

[^4_1]: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/external-data-workflow-block.md


---

# Now what is **Events**

The **Events** block (events.md) in Hedera Guardian describes how you can use **events to manage workflow control and logic between blocks** in a policy.

**Key Concepts:**

- **Events Tab:** Every block in Guardian’s Policy Workflow UI has an "Events" tab. Events let you transfer execution from one block to another, enabling **non-linear workflows** (jumping between blocks, not just sequential steps).
- **Settings:**
    - You can configure events as either **Input Events** (received by a block) or **Output Events** (emitted from a block).
    - Set source and target: Specify which block triggers the event and which block receives it.
    - Events can be tied to actors (who triggers or is responsible: initiator, document owner, issuer).
    - Disable events without deleting—helpful for debugging or conditional flows.
- **Default Events:** These are automatic transitions from one block to the next, but you can override, disable, or re-route these using the Events configuration.
- **Output Events:** These are after a block's main logic (like end of processing, changes in state, timer ticks for TimerBlock, condition evaluations for SwitchBlock, button presses for InterfaceActionBlock). There are also error events (when something fails).
- **Input Events:** These trigger when a block receives control—e.g., run main logic, refresh block, timer or pop events for aggregation, start/stop for timers, restore for document requests, or additional mint for linking mint blocks.
- **Event Actors:** Lets you control user context for events—who is seen as the "actor" (initiator, owner, issuer).

**Summary:**
Events in Guardian’s workflow blocks are a **powerful mechanism to automate, reroute, trigger, or conditionally process business logic** across blocks. They enable responsive, customizable, and adaptive policy flows (perfect for complex scenarios like IoT pipelines, token minting, MRV reporting, etc.). You can use events to:

- Route control between blocks dynamically.
- React to specific actions, timer ticks, button presses, or errors.
- Change user context for approvals, reviews, or automated checks.

**In Practice:**
If you aggregate sensor data (IoT), you could use an event to trigger downstream certification or validation. Or, on error, you could trigger a fallback or notification block.**Events in Guardian** are the mechanism that allow you to **transfer execution or control between workflow blocks**, enabling both linear and non-linear (dynamic) flows in a policy. Here’s what it covers:

- **Events Tab:** Each block has an 'Events' tab in the Guardian UI. You can configure events to control what happens when a block finishes or receives input—this enables you to jump to arbitrary blocks, not just the next one.
- **Event Settings:** Events can be set as input (block receives the event) or output (block emits the event), and you can specify the source block, target block, the actor in context (initiator, owner, issuer), and whether the event is active or disabled.
- **Default Events:** Automatically pass control to the next block by default—but you can disable this and reroute as needed.
- **Output Events:** Triggered when something happens in a block, such as RunEvent (main logic completed), RefreshEvent (state changed), TimerEvent (tick from TimerBlock), or error events.
- **Input Events:** Received by target blocks, such as RunEvent to execute logic, TimerEvent for periodic triggers, PopEvent to remove documents, etc.
- **Event Actor:** Specify who is the context for action: initiator, document owner, or issuer (important in approval workflows).

**Summary:**
Events are a powerful way to make your Guardian policy logic **dynamic, automated, and responsive**—you can react to data, errors, timers, button presses, and chain blocks in custom orders. This is essential for building real-world workflows, especially with sensor data, token minting, compliance, or customized approval steps.
<span style="display:none">[^5_1]</span>

<div align="center">⁂</div>

[^5_1]: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/events.md


---

# Ok now combine all (**aggregateDocumentBlock** + **externalDataBlock** + **Events**) and tell me how to apply it for ams.I.D

Here is **how to apply Guardian workflow blocks for AMS-I.D methodology using IoT data** and event automation, combining everything from your steps:

***

**1. Use External Data Block for IoT Integration**

- Start your AMS-I.D policy by configuring an **externalDataBlock** to capture live IoT sensor readings (like net electricity delivered to the grid, fuel consumption, or calorific value) from your renewable energy project. This block ingests the data and matches it to the AMS-I.D schemas for monitoring and reporting.

**2. Aggregate IoT Measurements**

- Feed these IoT documents into an **aggregateDocumentBlock** to group and process them according to AMS-I.D logic. For example, you could aggregate readings by time period (e.g., daily/weekly), by device or project participant, and apply calculations like total kWh delivered or GHG emissions saved.
- Use cumulative dimension aggregation or period settings to fit CDM’s requirements (e.g., sum energy, average values, calculate emission reductions per the referenced tools).

**3. Leverage Events for Workflow Automation and Compliance**

- Configure **Events** between workflow blocks to automate control transfer and audit logic (e.g., trigger document checks, move to VVB validation, or mint tokens when aggregation conditions are met).
- Set output events (e.g., after a successful aggregation run) to advance the workflow to validation and then minting, or error events to reroute non-compliant data for review.

**4. Apply AMS-I.D Project Logic**

- Map AMS-I.D key parameters (from methodology) as fields in data schemas:
    - Net electricity supplied (from IoT),
    - Fuel and biomass consumption,
    - Grid emission factor, etc.
- Use the **Step-by-Step workflow** in Guardian’s AMS-I.D policy guide:
    - Import and publish your AMS-I.D policy, create users (Participants, VVB, Registry).
    - Participants use IoT-powered forms and monitoring reports, with data validated and verified in sequence by VVB and Registry.
    - When report aggregation and verification match AMS-I.D rules, use the approve and mint process for CER credits.

**5. Monitoring, Approval, and Tokenization**

- Participants submit projects and monitoring reports using automated IoT data capture.
- VVB validates aggregated readings against AMS-I.D baseline and eligibility criteria.
- SR approves, triggering token minting for Certified Emission Reductions (CERs).

**6. All Data and Statuses Are Traceable**

- Each step (import, user creation, IoT data ingestion, aggregation, event-driven approvals/minting) is recorded and traceable via Guardian and Hedera.

***

**Summary Table**


| Step | Block/Tool | Data | Role | AMS-I.D Action |
| :-- | :-- | :-- | :-- | :-- |
| 1 | externalDataBlock | IoT sensor readings | Project Participant | Capture monitoring data |
| 2 | aggregateDocumentBlock | Aggregated values | Guardian Policy | Sum/analyze for compliance |
| 3 | Events | Triggers/approval | VVB + SR | Route documents, automate minting, handle errors |
| 4 | Guardian Policy Workflow | Monitoring/approval | All | Validate, approve, and mint CERs based on AMS-I.D |

You can architect your AMS-I.D implementation in Guardian this way to fully automate renewable energy reporting, carbon credit issuance, and compliance validation using IoT sources and smart workflow logic. This combines live data ingestion, aggregation, workflow automation, AMS-I.D policy validation, and tokenization.[^6_1]

<div align="center">⁂</div>

[^6_1]: https://github.com/hashgraph/guardian/blob/main/Methodology Library/Clean Development Mechanism (CDM)/CDM AMS-I.D/readme.md


---

# Here are all the sources that were referenced and searched

1. **Aggregate Document Block**
    - URL: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/aggregatedocumentblock.md
    - Title: guardian/docs/available-policy-workflow-blocks/aggregatedocumentblock.md at main · hashgraph/guardian
2. **External Data Block**
    - URL: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/external-data-workflow-block.md
    - Title: guardian/docs/available-policy-workflow-blocks/external-data-workflow-block.md at main · hashgraph/guardian
3. **Events Block**
    - URL: https://github.com/hashgraph/guardian/blob/main/docs/available-policy-workflow-blocks/events.md
    - Title: guardian/docs/available-policy-workflow-blocks/events.md at main · hashgraph/guardian
4. **AMS-I.D Methodology Guide**
    - URL: https://github.com/hashgraph/guardian/blob/main/Methodology Library/Clean Development Mechanism (CDM)/CDM AMS-I.D/readme.md
    - Title: guardian/Methodology Library/Clean Development Mechanism (CDM)/CDM AMS-I.D/readme.md at main · hashgraph/guardian

These sources provided detailed documentation and methodology for combining policy workflow blocks in Hedera Guardian with AMS-I.D and IoT integration.
<span style="display:none">[^7_1]</span>

<div align="center">⁂</div>

[^7_1]: https://github.com/hashgraph/guardian/blob/main/Methodology Library/Clean Development Mechanism (CDM)/CDM AMS-I.D/readme.md

