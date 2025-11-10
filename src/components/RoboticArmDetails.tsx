import React from 'react';

const RoboticArmDetails: React.FC = () => {
  const handleReturnHome = () => {
    // Clear the hash and go back to the main portfolio
    window.location.hash = '#projects';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleReturnHome}
          className="mb-8 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold transition-colors duration-200 flex items-center space-x-2 cursor-target"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Projects</span>
        </button>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Autonomous Utility Robotic Arm for Farming (AURA FARM)
        </h1>
        <div className="w-24 h-1 bg-accent mb-12"></div>

        {/* System Overview */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">System Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            The Autonomous Utility Robotic Arm for Farming (AURA FARM) is a comprehensive agricultural automation platform that combines 
            real-time data analysis, computer vision, robotics, and embedded systems to autonomously manage 
            agricultural tasks. The system operates through a multi-layered architecture that continuously 
            monitors field conditions, makes intelligent decisions, and executes precise robotic actions.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">System Architecture</h2>
          
          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">1. Data Acquisition Layer</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The system integrates with the <strong className="text-accent">AgroMonitoring API</strong> to fetch 
              real-time agricultural data from field sensors. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Weather Data:</strong> Temperature, humidity, precipitation, wind speed</li>
              <li><strong className="text-accent">Soil Metrics:</strong> Soil moisture levels, pH balance, nutrient concentrations</li>
              <li><strong className="text-accent">Plant Health:</strong> NDVI (Normalized Difference Vegetation Index) readings</li>
              <li><strong className="text-accent">Disease Risk:</strong> Predictive analytics for disease probability</li>
            </ul>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">2. Decision Engine</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The core intelligence of the system lies in the <strong className="text-accent">decision engine</strong>, 
              which implements a rule-based evaluation system with configurable thresholds:
            </p>
            <div className="bg-dark-bg border border-dark-border p-4 mb-4 font-mono text-sm">
              <div className="text-gray-400 mb-2">{'// Example Decision Logic'}</div>
              <div className="text-accent">IF</div>
              <div className="ml-4 text-gray-300">soil_moisture &lt; 30% <span className="text-gray-500">AND</span> temperature &gt; 30°C</div>
              <div className="text-accent ml-4">THEN</div>
              <div className="ml-8 text-gray-300">priority_task = IRRIGATION</div>
              <div className="text-accent ml-4">ELSE IF</div>
              <div className="ml-4 text-gray-300">NDVI &lt; 0.5 <span className="text-gray-500">AND</span> disease_risk &gt; 30%</div>
              <div className="text-accent ml-4">THEN</div>
              <div className="ml-8 text-gray-300">priority_task = PESTICIDE_APPLICATION</div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              The decision engine evaluates multiple parameters simultaneously and generates a <strong className="text-accent">prioritized task queue</strong>. 
              Tasks are ranked based on:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Severity of parameter violations</li>
              <li>Time sensitivity (e.g., irrigation needs immediate action)</li>
              <li>Resource availability (water, fertilizer, pesticides)</li>
              <li>Historical patterns and predictive models</li>
            </ul>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">3. Computer Vision & Object Detection</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              When a task is generated, the system activates its <strong className="text-accent">computer vision pipeline</strong> 
              using <strong className="text-accent">OpenCV</strong> and <strong className="text-accent">YOLOv8</strong>:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Image Capture:</strong> High-resolution camera captures field images</li>
              <li><strong className="text-accent">Object Detection:</strong> YOLOv8 model identifies crops, weeds, pests, and obstacles</li>
              <li><strong className="text-accent">Coordinate Transformation:</strong> Pixel coordinates are converted to world coordinates using calibrated camera-to-table mapping matrices</li>
              <li><strong className="text-accent">Target Localization:</strong> 3D position of target objects is calculated relative to the robotic arm base</li>
            </ol>
            <p className="text-gray-300 leading-relaxed mt-4">
              The vision system can identify specific plant species, detect disease symptoms, locate irrigation points, 
              and avoid obstacles in real-time. Theoretical positioning based on inverse kinematics calculations.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">4. Inverse Kinematics & Arm Control</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Once target coordinates are determined, the system calculates the required joint angles for the 
              <strong className="text-accent"> 6-DOF (Degree of Freedom) robotic arm</strong> using inverse kinematics:
            </p>
            <div className="bg-dark-bg border border-dark-border p-4 mb-4 font-mono text-sm">
              <div className="text-gray-400 mb-2">{'// Inverse Kinematics Algorithm'}</div>
              <div className="text-gray-300">target_position = (x, y, z) <span className="text-gray-500">{'// From computer vision'}</span></div>
              <div className="text-gray-300">target_orientation = (roll, pitch, yaw)</div>
              <div className="text-accent mt-2">CALCULATE:</div>
              <div className="ml-4 text-gray-300">joint_angles[6] = inverse_kinematics(target_position, target_orientation)</div>
              <div className="text-gray-300 ml-4">servo_commands[6] = angles_to_microseconds(joint_angles)</div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              The inverse kinematics solver uses geometric and analytical methods to determine the optimal joint 
              configuration, considering:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Arm reachability and workspace limits</li>
              <li>Joint angle constraints and mechanical limits</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              The calculated joint angles are converted to servo microsecond commands (typically 500-2500μs range) 
              for precise motor control.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">5. Embedded System & Actuation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The <strong className="text-accent">ESP32 microcontroller</strong> serves as the low-level control unit:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Serial Communication:</strong> Receives servo commands from the main control system via UART/USB</li>
              <li><strong className="text-accent">PWM Generation:</strong> Generates precise pulse-width modulation signals for each servo motor via ESP32Servo library</li>
              <li><strong className="text-accent">Microsecond Precision:</strong> Executes servo movements using writeMicroseconds() with microsecond-level timing</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              The ESP32 communicates bidirectionally with the main system, sending status confirmations after each command and receiving new servo position commands for coordinated arm movements.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6">
            <h3 className="text-xl font-semibold text-white mb-4">6. React Dashboard & Visualization</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The <strong className="text-accent">React dashboard</strong> provides a way to view data directly and see the queue of tasks:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Data Visualization:</strong> Direct view of sensor data from the AgroMonitoring API including weather, soil, and plant health metrics</li>
              <li><strong className="text-accent">Task Queue Display:</strong> Visual representation of the prioritized task queue showing pending and executing tasks</li>
            </ul>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Complete Workflow Example</h2>
          <div className="bg-dark-card border border-dark-border p-6">
            <div className="space-y-6">
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 1: Data Collection</div>
                <p className="text-gray-300">
                  AgroMonitoring API reports: Soil moisture = 25%, Temperature = 32°C, NDVI = 0.45
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 2: Decision Engine Evaluation</div>
                <p className="text-gray-300">
                  Decision engine detects multiple threshold violations. Calculates priority score: 
                  IRRIGATION (Priority: 9/10) - Critical water deficit detected
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 3: Task Generation</div>
                <p className="text-gray-300">
                  System generates task: "Irrigate Zone A-3" with target coordinates and water volume requirements
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 4: Computer Vision Localization</div>
                <p className="text-gray-300">
                  Camera captures field image. YOLOv8 identifies irrigation point at pixel (640, 480). 
                  Coordinate transformation calculates world position: (1.2m, 0.8m, 0.3m) relative to arm base
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 5: Inverse Kinematics Calculation</div>
                <p className="text-gray-300">
                  IK solver computes joint angles: [45°, 30°, 90°, 15°, 0°, 0°]. Converts to servo commands: 
                  [1500μs, 1200μs, 2000μs, 1100μs, 1500μs, 1500μs]
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 6: Arm Execution</div>
                <p className="text-gray-300">
                  ESP32 receives commands via serial. Servos move to target position over 3 seconds. 
                  Theoretical positioning based on inverse kinematics calculations.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <div className="text-accent font-semibold mb-2">Step 7: Verification & Dashboard Update</div>
                <p className="text-gray-300">
                  Task marked complete. Dashboard updates with new sensor readings. System continues monitoring 
                  for next task generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Data Processing</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Python scripts (Simulated data)</li>
                <li>• AgroMonitoring API Integration</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Computer Vision</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• OpenCV (Image processing)</li>
                <li>• YOLOv8 (Object detection)</li>
                <li>• NumPy (Coordinate transformations)</li>
                <li>• Camera calibration matrices</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Robotics & Control</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Inverse Kinematics solver</li>
                <li>• Path planning algorithms</li>
                <li>• ESP32 (Arduino framework)</li>
                <li>• Servo motor control (PWM)</li>
                <li>• Serial communication (UART)</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• React (JavaScript)</li>
                <li>• Three.js (animated background component)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-dark-border">
          <button
            onClick={handleReturnHome}
            className="px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold transition-colors duration-200 flex items-center space-x-2 cursor-target"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoboticArmDetails;

