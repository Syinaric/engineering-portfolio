export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  externalUrl?: string;
  buttonText: string;
}

export const projects: Project[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: "BotAutonomy",
    description: "Smart plant care system that uses hardware, software, and AI to monitor plant health, automate watering, and provide real-time feedback and interaction through a chatbot and web dashboard.",
    image: require('../assets/BotAutonomy.jpeg'),
    technologies: [],
    githubUrl: "https://github.com/mibrahim20071030/PlantHub",
    buttonText: "View Code"
  },
  {
    id: 3,
    title: "Sumo Bot",
    description: "A manually driven sumo robot designed to push opponent bots out of a boundary, built using Arduino for precise control and robust competition.",
    image: require('../assets/Sumobot.jpeg'),
    technologies: [],
    buttonText: ""
  }
]; 