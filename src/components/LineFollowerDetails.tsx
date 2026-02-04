import React from 'react';

const LineFollowerDetails: React.FC = () => {
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
          Line Follower Robot
        </h1>
        <div className="w-24 h-1 bg-accent mb-12"></div>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Project Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            An advanced autonomous line-following robot that combines multiple sensor technologies with intelligent 
            navigation algorithms. The robot successfully navigates complex tracks using edge-following programs, 
            completes mini tasks including target hitting and cube manipulation, and integrates GPS-based positioning 
            for enhanced accuracy. The project also features an innovative web application powered by Google's Gemini 
            API that can analyze track images and generate segmented navigation data, enabling efficient memory 
            management on resource-constrained Arduino hardware.
          </p>
        </section>

        {/* Sensor System */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Multi-Sensor Navigation System</h2>
          
          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">1. IR Sensors</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Infrared sensors provide the primary line detection mechanism. Multiple IR sensors arranged in an array 
              allow the robot to detect the line's position relative to its center, enabling precise path following 
              and edge detection.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Edge Following:</strong> Specialized algorithm that maintains the robot's position relative to the line edge</li>
              <li><strong className="text-accent">Multi-Sensor Array:</strong> Multiple IR sensors provide redundancy and improved accuracy</li>
              <li><strong className="text-accent">Real-time Feedback:</strong> Continuous sensor readings enable dynamic path correction</li>
            </ul>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">2. Color Sensors</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Color sensors enhance the robot's ability to distinguish between different track elements and identify 
              task-specific markers. This enables the robot to recognize intersections, task zones, and navigation cues.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Track Segmentation:</strong> Identifies different colored sections of the track</li>
              <li><strong className="text-accent">Task Recognition:</strong> Detects colored markers indicating task zones</li>
              <li><strong className="text-accent">Navigation Aids:</strong> Provides additional context for decision-making</li>
            </ul>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">3. Ultrasonic Sensors</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ultrasonic sensors provide obstacle detection and distance measurement capabilities. This allows the 
              robot to navigate around obstacles, maintain safe distances, and complete tasks that require spatial awareness.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-accent">Obstacle Avoidance:</strong> Detects and navigates around obstacles on the track</li>
              <li><strong className="text-accent">Distance Measurement:</strong> Provides precise distance data for task execution</li>
              <li><strong className="text-accent">Safety Systems:</strong> Prevents collisions during navigation</li>
            </ul>
          </div>
        </section>

        {/* Edge Following Algorithm */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Edge Following Program</h2>
          <div className="bg-dark-card border border-dark-border p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              The robot implements a sophisticated <strong className="text-accent">edge-following algorithm</strong> that maintains 
              optimal positioning relative to the track boundary. Unlike simple center-line following, edge following provides 
              better handling of sharp turns, intersections, and complex track geometries.
            </p>
            <div className="bg-dark-bg border border-dark-border p-4 mb-4 font-mono text-sm">
              <div className="text-gray-400 mb-2">{'// Edge Following Logic'}</div>
              <div className="text-accent">WHILE</div>
              <div className="ml-4 text-gray-300">track_detected</div>
              <div className="text-accent ml-4">DO</div>
              <div className="ml-8 text-gray-300">ir_reading = read_ir_sensors()</div>
              <div className="ml-8 text-gray-300">edge_position = calculate_edge_position(ir_reading)</div>
              <div className="ml-8 text-gray-300">error = target_edge_position - edge_position</div>
              <div className="ml-8 text-accent">IF</div>
              <div className="ml-12 text-gray-300">error &gt; threshold</div>
              <div className="ml-12 text-accent">THEN</div>
              <div className="ml-16 text-gray-300">adjust_motor_speeds(proportional_control(error))</div>
              <div className="ml-8 text-accent">END IF</div>
              <div className="text-accent ml-4">END WHILE</div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-4">
              The algorithm continuously monitors sensor readings, calculates the edge position, and adjusts motor speeds 
              using proportional control to maintain the desired edge offset. This approach provides smooth, responsive 
              navigation with minimal oscillation.
            </p>
          </div>
        </section>

        {/* Mini Tasks */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Track Mini Tasks</h2>
          
          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Target Hitting</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The robot is capable of identifying and hitting targets positioned along the track. Using a combination 
              of color sensors to detect target zones and ultrasonic sensors to measure distance, the robot positions 
              itself accurately and activates a hitting mechanism.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Color sensor detects target zone markers</li>
              <li>Ultrasonic sensor measures distance to target</li>
              <li>Precise positioning using edge-following and GPS data</li>
              <li>Activation of hitting mechanism at optimal distance</li>
            </ul>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Cube Manipulation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              One of the most challenging tasks involves detecting, approaching, and moving cubes placed on the track. 
              The robot uses ultrasonic sensors to locate cubes, color sensors to identify cube characteristics, and 
              precise motor control to manipulate objects without losing track position.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Object detection using ultrasonic sensors</li>
              <li>Approach and alignment algorithms</li>
              <li>Mechanical manipulation mechanism</li>
              <li>Return to track navigation after task completion</li>
            </ul>
          </div>
        </section>

        {/* Gemini API Web Application */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Gemini API Track Segmentation System</h2>
          <div className="bg-dark-card border border-dark-border p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              A revolutionary web application powered by <strong className="text-accent">Google's Gemini API</strong> that 
              analyzes track images and automatically generates a GPS system for any track. Through carefully engineered prompts, 
              the system examines the track image, identifies task zones, and creates a memory-efficient representation that 
              enables precise navigation and error correction.
            </p>
            
            <div className="bg-dark-card border border-dark-border p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Prompt Engineering for Universal GPS System</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We developed a sophisticated prompt that acts as a "Map Compiler" for the UTRA Hacks Robot. The exact prompt used is:
              </p>
              
              <div className="bg-dark-bg border border-dark-border p-4 mb-4 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                <div className="mb-2"><strong className="text-accent">**Role:**</strong> You are the Map Compiler for the UTRA Hacks Robot.</div>
                <div className="mb-2"><strong className="text-accent">**Task:**</strong> Analyze the track in Image 3 (using Images 1 &amp; 2 for scale) and output the raw navigation data.</div>
                <div className="mb-4"><strong className="text-accent">**CALIBRATION &amp; SCALING:**</strong></div>
                <div className="ml-4 mb-2">1. <strong className="text-accent">Transfer Learning:</strong> Use the <strong className="text-accent">2-inch tape width</strong> and the known <strong className="text-accent">96&quot; Apex / 34.5&quot; Width</strong> from Images 1 &amp; 2 to determine the exact &quot;Pixels-per-Inch&quot; (PPI) for Image 3.</div>
                <div className="ml-4 mb-2">2. <strong className="text-accent">Visual Measurement:</strong> Measure the track in Image 3 using this PPI. Do NOT force values to a target center; use the visual data directly.</div>
                <div className="ml-4 mb-2">3. <strong className="text-accent">Sanity Check Ranges (Guard Rails):</strong></div>
                <div className="ml-8 mb-1">• <strong className="text-accent">Total Length:</strong> Must fall between <strong className="text-accent">220.0 - 237.0 inches</strong>.</div>
                <div className="ml-8 mb-1">• <strong className="text-accent">Obstacle Spacing:</strong> The distance between Obstacle 1 and Obstacle 2 MUST fall between <strong className="text-accent">60.0 - 80.0 inches</strong>.</div>
                <div className="ml-8 mb-4">• <em>Correction Logic:</em> Only if your measurement is OUTSIDE these ranges (e.g., 90&quot;), re-evaluate the scale to bring it barely inside the nearest boundary (e.g., 80&quot;). If it is inside (e.g., 68&quot; or 75&quot;), KEEP IT EXACTLY AS MEASURED.</div>
                <div className="mb-4"><strong className="text-accent">**MAP GENERATION (Inch-by-Inch):**</strong></div>
                <div className="ml-4 mb-2">Create an array where <strong className="text-accent">EVERY ENTRY</strong> represents <strong className="text-accent">ONE INCH</strong> of the track.</div>
                <div className="ml-4 mb-1">• <strong className="text-accent">0</strong>: Plain Red Track</div>
                <div className="ml-4 mb-1">• <strong className="text-accent">1</strong>: Obstacle (Cardboard Prism) - Mark for ~5 inches.</div>
                <div className="ml-4 mb-1">• <strong className="text-accent">2</strong>: First Blue Square Checkpoint.</div>
                <div className="ml-4 mb-4">• <strong className="text-accent">3</strong>: Second Blue Square Checkpoint.</div>
                <div className="mb-4"><strong className="text-accent">**OUTPUT FORMAT (STRICT):**</strong></div>
                <div className="ml-4 mb-2">Output exactly two lines. Nothing else.</div>
                <div className="ml-4 mb-1"><strong className="text-accent">Line 1:</strong> The Total Length of the track in inches (Float).</div>
                <div className="ml-4 mb-4"><strong className="text-accent">Line 2:</strong> The Map Array (Comma-separated integers).</div>
                <div className="mb-2"><strong className="text-accent">**Example Output:**</strong></div>
                <div className="ml-4 text-gray-400">228.5</div>
                <div className="ml-4 text-gray-400">0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0... [continuing for the exact length]</div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                This prompt-based approach makes the system <strong className="text-accent">universal</strong>—it can generate 
                a GPS system for any track configuration without manual programming or track-specific code modifications.
              </p>
            </div>

            <div className="bg-dark-card border border-dark-border p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Flattened Array Representation</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The core innovation is the <strong className="text-accent">flattened array</strong> representation where each 
                array index represents one inch of track distance, and each value (0-3) represents the task type: 
                <strong className="text-accent"> 0</strong> = Plain Red Track, <strong className="text-accent">1</strong> = Obstacle, 
                <strong className="text-accent"> 2</strong> = First Blue Checkpoint, <strong className="text-accent">3</strong> = Second Blue Checkpoint.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This representation is extremely memory-efficient. For a typical track (~230 inches), the entire GPS system requires 
                only ~230 bytes—well within Arduino R3's memory constraints. The array provides instant O(1) lookup: given a position 
                in inches, the robot immediately knows what task (if any) it should perform at that location.
              </p>
            </div>

            <div className="bg-dark-bg border border-dark-border p-4">
              <h4 className="text-lg font-semibold text-accent mb-3">System Workflow:</h4>
              <p className="text-gray-300 text-sm">
                User uploads track images (including calibration images), the Gemini API analyzes them using the prompt, 
                generates the flattened array output, and the data is exported for direct Arduino integration.
              </p>
            </div>
          </div>
        </section>

        {/* Memory Optimization */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Arduino R3 Memory Optimization</h2>
          <div className="bg-dark-card border border-dark-border p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              One of the project's most significant achievements is implementing a complete GPS system and track simulation 
              on an <strong className="text-accent">Arduino Uno R3</strong> with only <strong className="text-accent">32KB of flash memory</strong>. 
              The flattened array approach provides an elegant solution that maximizes functionality while minimizing memory usage.
            </p>
            
            <div className="bg-dark-bg border border-dark-border p-4 mb-4">
              <h4 className="text-lg font-semibold text-accent mb-3">Memory Efficiency:</h4>
              <p className="text-gray-300 text-sm mb-2">
                Each array element is a single byte (uint8_t), storing values 0-3. The array is stored in PROGMEM (program memory), 
                not RAM, preserving RAM for runtime operations. For a typical ~230 inch track, the entire GPS system uses only ~230 bytes 
                of program memory. Position lookup is O(1) with direct index access and no complex data structures.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mt-4">
              By using the flattened array representation generated from Gemini API analysis, the entire GPS system and track 
              simulation fits comfortably within the Arduino's memory constraints. This approach provides a simple yet powerful 
              way to store track information and enable precise navigation with minimal memory footprint.
            </p>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-6">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Hardware</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Arduino Uno R3 (32KB flash)</li>
                <li>• IR Sensor Array</li>
                <li>• Color Sensors</li>
                <li>• Ultrasonic Sensors</li>
                <li>• DC Motors with Encoders</li>
                <li>• Motor Driver (L298N/H-Bridge)</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Software & Algorithms</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Arduino C/C++</li>
                <li>• Edge Following Algorithm</li>
                <li>• PID Control</li>
                <li>• Sensor Fusion</li>
                <li>• Memory-Efficient Data Structures</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Web Application</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Google Gemini API</li>
                <li>• Image Processing</li>
                <li>• Track Segmentation</li>
                <li>• Data Compression</li>
                <li>• Arduino Data Export</li>
              </ul>
            </div>
            
            <div className="bg-dark-card border border-dark-border p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Multi-sensor navigation</li>
                <li>• GPS position cross-referencing</li>
                <li>• AI-powered track analysis</li>
                <li>• Memory-optimized Arduino code</li>
                <li>• Task execution capabilities</li>
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

export default LineFollowerDetails;
