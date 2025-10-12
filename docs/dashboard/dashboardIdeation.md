**" IoT dashboard"**. The diagram outlines the system's architecture, user flow, and core functionalities, all enclosed within a large green rectangle suggesting it's the main application scope.

Here is a breakdown of the different components and flows depicted:

### Core Dashboard Functionality 

1. **Data Input & Sensor Simulation:**
    
    - At the heart of the diagram is a box labeled **"Connected Sensor `https://cloudflarelinkapi`"**, which shows example real-time data:  `0.00 W` if 1000w-> show 1kw if 1000kW show 1mW and so on. This represents the data source, likely an IoT device monitoring environmental or energy metrics.
        
    - A box labeled **"realtime data"** is connected to this sensor, indicating the dashboard's ability to display live information.
        
2. **User Interaction & Form fillin:**
    
    - On the left side, there is a user input flow that starts with a **"Fill in Form / Button"**.
        
    - This leads to a **"Fil in"** component. to fill the gardian vc document (show verifiable credentials document ) be as explicit as possible
        
    - The filin then points to the "Connected Sensor" box
        
3. **Carbon Credit Calculation and Issuance:**
    
    - A central calculation is shown: **`0,0001 tCO2 ≈ 1.5$`**. An arrow points from the sensor data to this box, indicating that the system automatically converts the sensor readings (likely energy consumption) into a corresponding amount of CO₂ (carbon dioxide) emissions and estimates its monetary value. a demo toggle should be at the up right that trigger mockdata and sensor.
        
    - On the right, there is a function labeled **"Issue"**.
        
    - This "Issue" function is linked to a box below it labeled **"Carbon credit 1 tCO₂ eq"**, implying that a key feature is the ability to formally issue a carbon credit based on the verified data.
        