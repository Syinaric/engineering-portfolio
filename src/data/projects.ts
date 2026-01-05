export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  achievements?: string[];
  buttons?: {
    text: string;
    url: string;
    type: 'github' | 'demo' | 'external';
  }[];
  githubUrl?: string;
  demoUrl?: string;
  externalUrl?: string;
  buttonText: string;
}

export const projects: Project[] = [
  {
    id: 7,
    title: "Wind-Powered Triboelectric Nanogenerator (TENG)",
    description: "Nano Design Days 2025 - Designed and built a wind-driven Triboelectric Nanogenerator (TENG) capable of converting mechanical energy into electrical energy using the triboelectric effect. The device harvests energy from airflow, causing a rotor to spin and repeatedly bring Teflon (electron-accepting material) into contact with aluminum foil electrodes (electron-donating material), generating charge through contact–separation. The mechanical structure was custom-designed and 3D-printed in PLA to ensure electrical isolation and precise alignment. Four stationary foil-wrapped electrodes were arranged around a central rotating shaft supported by a bearing. A conductive slip-contact was implemented to electrically reference the rotating shaft while allowing smooth rotation. The generated high-voltage, low-current AC signal was rectified using a 1N4001 diode and stored in a capacitor, enabling visible output through an LED and measurable voltage on a breadboard circuit.",
    image: require('../assets/teng1.jpg'),
    images: [
      require('../assets/teng1.jpg'),
      require('../assets/teng2.jpg')
    ],
    technologies: [],
    achievements: [
      '16V',
      '65Hz'
    ],
    buttonText: ""
  },
  {
    id: 1,
    title: "Autonomous Utility Robotic Arm for Farming (AURA FARM)",
    description: "Autonomous robotic arm system for agricultural automation with data-driven decision making. Integrates AgroMonitoring API for real-time sensor data, uses computer vision (OpenCV, YOLOv8) for object detection, and implements inverse kinematics for 6-DOF arm control. Automatically generates and executes tasks like irrigation, fertilization, harvesting, and field inspection based on real-time conditions.",
    image: require('../assets/AURA FARM.jpg'),
    images: [
      require('../assets/AURA FARM.jpg'),
      require('../assets/Front end AURA.png'),
      require('../assets/API USE.JPG')
    ],
    technologies: [],
    buttons: [
      {
        text: "View More",
        url: "#robotic-arm-details",
        type: "demo"
      },
      {
        text: "View Code",
        url: "https://github.com/Syinaric/A.U.R.A.-Farm",
        type: "github"
      }
    ],
    buttonText: ""
  },
  {
    id: 2,
    title: "Custom BLDC Motor",
    description: "Designed and built a custom brushless DC motor from scratch. Created a 12-slot stator and rotor in CAD, 3D printed prototypes, and wound the stator in a three-phase star (wye) configuration with alternating polarity coils. The motor runs as a three-phase BLDC with external ESC control, demonstrating expertise in electromagnetics, CAD design, and manufacturing processes.",
    image: require('../assets/complete motor.jpg'),
    images: [
      require('../assets/complete motor.jpg'),
      require('../assets/stator.jpg'),
      require('../assets/magnets.jpg'),
      require('../assets/wired stator.jpg')
    ],
    technologies: [],
    buttonText: ""
  },
  {
    id: 3,
    title: "BotAutonomy",
    description: "Smart plant care system that uses hardware, software, and AI to monitor plant health, automate watering, and provide real-time feedback and interaction through a chatbot and web dashboard.",
    image: require('../assets/BotAutonomy.jpeg'),
    technologies: [],
    buttons: [
      {
        text: "View Code",
        url: "https://github.com/mibrahim20071030/PlantHub",
        type: "github"
      },
      {
        text: "View Project",
        url: "https://dorahacks.io/buidl/26416/",
        type: "demo"
      }
    ],
    githubUrl: "https://github.com/mibrahim20071030/PlantHub",
    buttonText: "View Code"
  },
  {
    id: 4,
    title: "Sumo Bot",
    description: "A manually driven sumo robot designed to push opponent bots out of a boundary, built using Arduino for precise control and robust competition.",
    image: require('../assets/Sumobot.jpeg'),
    technologies: [],
    buttons: [
      {
        text: "View Code",
        url: "#sumo-bot-code",
        type: "demo"
      }
    ],
    buttonText: "View Code"
  },
  {
    id: 5,
    title: "Robot Ping Pong Opponent",
    description: "Built a rough prototype of a ping pong ball launching robot using an Arduino Uno R3, along with a mix of DC and servo motors. The robot can rapidly fire ping pong balls at high speed and with impressive accuracy. It can rotate to aim in different directions, and its mechanical design includes a feeder system that holds multiple balls, launching them with a 3-second delay between shots. Both the firing power and direction are fully adjustable.",
    image: require('../assets/pp1.jpg'),
    images: [
      require('../assets/pp1.jpg'),
      require('../assets/pp2.jpg'),
      require('../assets/pp3.jpg'),
      require('../assets/pp4.jpg')
    ],
    technologies: [],
    buttons: [
      {
        text: "View Code",
        url: "#ping-pong-code",
        type: "demo"
      },
      {
        text: "View Drawings",
        url: "/All Assemblies (1)-combined.pdf",
        type: "external"
      }
    ],
    buttonText: "View Code"
  },
  {
    id: 6,
    title: "TasteR",
    description: "Food Discovery Web App - A web-based food discovery platform that lets users scan restaurant menus and explore dishes through a Tinder-style swipe interface with real images. Users swipe right to shortlist favorites and left to skip, helping them visually decide what to eat.",
    image: require('../assets/TasteR.png'),
    images: [
      require('../assets/TasteR.png'),
      require('../assets/TasteR-1.png'),
      require('../assets/TasteR-2.png'),
      require('../assets/TasteR-3.png'),
      require('../assets/TasteR-4.png')
    ],
    technologies: [],
    githubUrl: "https://github.com/Syinaric/TasteR/tree/main",
    buttonText: "View Code"
  }
]; 