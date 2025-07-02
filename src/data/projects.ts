export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
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
  }
]; 