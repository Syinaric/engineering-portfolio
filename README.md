# Engineering Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, designed for nanotechnology engineers and researchers.

## Features

- 🎨 **Dark Theme Design** - Modern dark aesthetic with clean typography
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🧱 **Fixed Sidebar** - Profile information stays visible while scrolling
- 📋 **Project Showcase** - Display projects with images, descriptions, and links
- ⚡ **Smooth Animations** - Hover effects and transitions for better UX
- 🔧 **Easy Maintenance** - Centralized project data management

## Tech Stack

- **React 18** - Modern React with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

### Updating Project Data

Edit `src/data/projects.ts` to add, remove, or modify projects:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description here...",
    image: "https://your-image-url.com/image.jpg",
    technologies: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/yourusername/project",
    demoUrl: "https://demo-url.com",
    buttonText: "View Demo"
  },
  // Add more projects...
];
```

### Updating Profile Information

Edit `src/components/Sidebar.tsx` and `src/components/MobileMenu.tsx` to update:

- Profile picture URL
- Name and title
- About section
- Skills list
- Social media links

### Styling

The project uses Tailwind CSS with custom colors defined in `tailwind.config.js`. You can modify:

- Color scheme in the `colors` section
- Typography in the `fontFamily` section
- Custom animations and utilities

## Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx          # Desktop sidebar component
│   ├── MobileMenu.tsx       # Mobile menu component
│   ├── ProjectCard.tsx      # Individual project card
│   └── ProjectsList.tsx     # Projects grid container
├── data/
│   └── projects.ts          # Project data and types
├── App.tsx                  # Main app component
└── index.css               # Global styles and Tailwind imports
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.
