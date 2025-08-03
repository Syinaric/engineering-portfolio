export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
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
    id: 1,
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
    id: 2,
    title: "Sumo Bot",
    description: "A manually driven sumo robot designed to push opponent bots out of a boundary, built using Arduino for precise control and robust competition.",
    image: require('../assets/Sumobot.jpeg'),
    technologies: [],
    buttonText: ""
  },
  {
    id: 3,
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
    id: 4,
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