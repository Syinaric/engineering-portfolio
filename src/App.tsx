import React, { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Dither from './components/Dither';
import ProjectModal, { ProjectInfo } from './components/ProjectModal';

const RESUME_URL =
  'https://drive.google.com/file/d/1MQApxz9isLBjM0HETjNrHXAGl9kylzXd/view?usp=sharing';

const links = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mahir-arora' },
  { label: 'GitHub', url: 'https://github.com/Syinaric' },
  { label: 'Instagram', url: 'https://www.instagram.com/mahirarora21/' },
  { label: 'email', url: 'mailto:mahirarora21@gmail.com' },
  { label: 'résumé', url: RESUME_URL },
];

const projects: ProjectInfo[] = [
  {
    title: 'Systolic Array GEMM Engine',
    description:
      'An 8×8 output-stationary systolic array for INT8 matrix multiply, written in synthesizable SystemVerilog and verified with cocotb testbenches checked against Python golden models, with a GitHub Actions regression that sweeps parameters on every push.',
    details:
      'A hardware GEMM (general matrix multiply) accelerator built from the processing element up. Each PE performs one signed INT8 multiply-accumulate per cycle into a 32-bit accumulator, passing operands east and south to its neighbours, and holds its finished result in a shadow register so a new tile can start while the previous one is still being read out. The PEs are tiled into a parameterized N×N mesh (currently 8×8) wrapped in a skew network of delay lines, which staggers each row and column of operands by the right number of cycles so every MAC lands on the correct pair, and fans the first/last tile tags out to each row\'s arrival time. Results leave through a column-wise drain chain rather than a wide combinational readout. Verification is done in cocotb: Python golden models of the PE, the delay line, and the full mesh generate expected results, and self-checking testbenches assert against the RTL so a mismatch fails the run instead of hiding in a waveform. A GitHub Actions workflow runs the whole regression under Icarus Verilog on every push, including parameter sweeps across array and delay depths. Ongoing work is the control FSM for tile sequencing and an INT32 to INT8 requantization stage.',
    links: [
      { label: 'Code', url: 'https://github.com/Syinaric/Systolic-Array-GEMM-Engine' },
    ],
  },
  {
    title: 'Line Follower Robot',
    images: [
      require('./assets/UTRA.jpg'),
      require('./assets/UTRAMAP.png'),
    ],
    description:
      'Autonomous line-following robot using IR, color, and ultrasonic sensors with edge-following algorithms, paired with a Gemini-powered web app that segments tracks from images and runs a memory-efficient simulation on a 32KB Arduino R3.',
    details:
      'Autonomous line-following robot using IR, color, and ultrasonic sensors with edge-following algorithms. Completed complex track navigation with mini tasks including target hitting and cube manipulation. Features a Gemini API-powered web application that segments tracks from images and measurements, plus a GPS system for sensor data cross-referencing. Implemented an innovative memory-efficient track simulation system on Arduino R3 with only 32KB of memory.',
    links: [{ label: 'Code', url: 'https://github.com/Aabjosh/Utra-Hacks-2026' }],
  },
  {
    title: 'Custom Low-Dropout (LDO) Voltage Regulator PCB',
    images: [
      require('./assets/PCB.png'),
    ],
    description:
      'A custom 3.3V low-dropout regulator PCB built around the TPS7A02 in Altium, supporting stable regulation from a 5–12V input with careful component selection, decoupling, and grounding for low-noise analog performance.',
    details:
      'Designed a custom 3.3V low-dropout (LDO) regulator PCB using the TPS7A02 series, supporting stable regulation from 5–12V input for embedded systems. Selected resistors and capacitors based on ESR, temperature coefficient, and stability requirements from datasheet analysis. Implemented proper schematic hierarchy including power ports, EN pull-up network, decoupling layout strategy, and grounding best practices for low-noise analog performance.',
    hologram: {
      shape: 'cube',
      modelUrl: '/models/pcb.gltf',
      // Authored Z-up; tip it upright.
      rotation: [-Math.PI / 2, 0, 0],
    },
  },
  {
    title: 'Autonomous Utility Robotic Arm for Farming (AURA Farm)',
    images: [
      require('./assets/AURA FARM.jpg'),
      require('./assets/Front end AURA.png'),
      require('./assets/API USE.JPG'),
    ],
    description:
      'A 6-DOF robotic arm for agricultural automation that integrates live sensor data, computer vision (OpenCV, YOLOv8), and inverse kinematics to automatically plan and execute irrigation, fertilization, harvesting, and inspection tasks.',
    details:
      'Autonomous robotic arm system for agricultural automation with data-driven decision making. Integrates AgroMonitoring API for real-time sensor data, uses computer vision (OpenCV, YOLOv8) for object detection, and implements inverse kinematics for 6-DOF arm control. Automatically generates and executes tasks like irrigation, fertilization, harvesting, and field inspection based on real-time conditions.',
    links: [{ label: 'Code', url: 'https://github.com/Syinaric/A.U.R.A.-Farm' }],
    hologram: {
      shape: 'cube',
      modelUrl: '/models/aura.gltf',
      // Authored Z-up; tip it upright.
      rotation: [-Math.PI / 2, 0, 0],
    },
  },
  {
    title: 'Wind-Powered Triboelectric Nanogenerator (TENG)',
    images: [
      require('./assets/teng1.jpg'),
      require('./assets/teng2.jpg'),
    ],
    description:
      'A wind-driven nanogenerator that converts airflow into electricity via the triboelectric effect, using a 3D-printed rotor to repeatedly contact Teflon and aluminum electrodes, rectified and stored to reach 16V at 65Hz.',
    details:
      'Nano Design Days 2025: Designed and built a wind-driven Triboelectric Nanogenerator (TENG) capable of converting mechanical energy into electrical energy using the triboelectric effect. The device harvests energy from airflow, causing a rotor to spin and repeatedly bring Teflon into contact with aluminum foil electrodes, generating charge through contact-separation. The mechanical structure was custom-designed and 3D-printed in PLA to ensure electrical isolation and precise alignment. A conductive slip-contact electrically references the rotating shaft while allowing smooth rotation, and the generated high-voltage AC signal was rectified with a 1N4001 diode and stored in a capacitor, driving an LED and measurable voltage on a breadboard circuit.',
    achievements: ['16V', '65Hz'],
  },
  {
    title: 'Custom BLDC Motor',
    images: [
      require('./assets/complete motor.jpg'),
      require('./assets/stator.jpg'),
      require('./assets/magnets.jpg'),
      require('./assets/wired stator.jpg'),
    ],
    description:
      'A brushless DC motor built from scratch: a 12-slot stator and rotor designed in CAD, 3D printed, and hand-wound in a three-phase star configuration, driven as a three-phase BLDC with external ESC control.',
    details:
      'Designed and built a custom brushless DC motor from scratch. Created a 12-slot stator and rotor in CAD, 3D printed prototypes, and wound the stator in a three-phase star (wye) configuration with alternating polarity coils. The motor runs as a three-phase BLDC with external ESC control, demonstrating expertise in electromagnetics, CAD design, and manufacturing processes.',
    hologram: {
      shape: 'torus',
      modelUrl: '/models/bldc-motor.gltf',
      // Model is authored Z-up; tip it upright.
      rotation: [-Math.PI / 2, 0, 0],
    },
  },
  {
    title: 'BotAutonomy',
    images: [
      require('./assets/BotAutonomy.jpeg'),
    ],
    description:
      'A smart plant-care system combining hardware, software, and AI to monitor plant health, automate watering, and provide real-time feedback through a chatbot and web dashboard.',
    links: [
      { label: 'Code', url: 'https://github.com/mibrahim20071030/BotAutonomy' },
      { label: 'Project', url: 'https://dorahacks.io/buidl/26416/' },
    ],
  },
  {
    title: 'Sumo Bot',
    images: [
      require('./assets/Sumobot.jpeg'),
    ],
    description:
      'A manually driven Arduino sumo robot designed to push opponent bots out of the ring, built for precise control and robust competition. Came in first place in the sumo category and second overall.',
    achievements: ['1st Place Sumo Category', '2nd Overall'],
  },
  {
    title: 'Robot Ping Pong Opponent',
    images: [
      require('./assets/pp1.jpg'),
      require('./assets/pp2.jpg'),
      require('./assets/pp3.jpg'),
      require('./assets/pp4.jpg'),
    ],
    description:
      'An Arduino ball-launching robot that fires ping pong balls at speed and accuracy, with a rotating aim, adjustable firing power, and a multi-ball feeder system.',
    details:
      'Built a prototype of a ping pong ball launching robot using an Arduino Uno R3, along with a mix of DC and servo motors. The robot can rapidly fire ping pong balls at high speed and with impressive accuracy. It can rotate to aim in different directions, and its mechanical design includes a feeder system that holds multiple balls, launching them with a 3-second delay between shots. Both the firing power and direction are fully adjustable.',
    links: [{ label: 'Drawings', url: '/All Assemblies (1)-combined.pdf' }],
    hologram: {
      shape: 'cube',
      modelUrl: '/models/pingpong-launcher.gltf',
      // Authored Z-up; tip it upright.
      rotation: [-Math.PI / 2, 0, 0],
    },
  },
  {
    title: 'Statistical Distribution Analysis Tool',
    images: [
      require('./assets/NE111.png'),
    ],
    description:
      'A Streamlit application for fitting statistical distributions to numerical datasets with interactive visualizations, supporting random generation, manual entry, and CSV uploads (Python, SciPy, Matplotlib).',
    details:
      'Data analysis application for fitting statistical distributions to numerical datasets with interactive visualizations. Supports multiple input methods including random generation, manual entry, and CSV uploads. Built with Python, Streamlit, Matplotlib, and SciPy for the NE111 course, demonstrating statistical analysis and scientific computing in engineering. Deployed on Streamlit Community Cloud.',
    links: [{ label: 'Code', url: 'https://github.com/Syinaric/NE111-project' }],
  },
];

/** Experience write-up, linked from the header rather than the project list. */
const uwasic: ProjectInfo = {
  title: 'Digital Design at UWASIC',
  images: [
    require('./assets/ethernet1.png'),
    require('./assets/ethernet2.png'),
  ],
  description:
    "Building and verifying a modular 10 Gb/s Ethernet physical coding sublayer with Waterloo's ASIC design team. My work includes synthesizable SystemVerilog RTL, 64b/66b encoding, and self-checking verification.",
  details:
    "Digital Design member at UWASIC, the University of Waterloo's ASIC design team, building and verifying a modular 10 Gb/s Ethernet physical coding sublayer (PCS) in synthesizable SystemVerilog. The PCS sits between XGMII and the SerDes, and is split into independently simulated blocks: 64b/66b encode and decode, scrambling and descrambling, the TX and RX gearboxes, and block synchronization that drives bit slip until the RX path locks onto 66-bit block boundaries. I own verification for the entire receive path, writing self-checking testbenches that drive stimulus, model the expected result, and assert against the RTL so mismatches fail the run automatically instead of being caught by eye in a waveform viewer. I have also contributed RTL for parts of the design.",
  links: [{ label: 'Code', url: 'https://github.com/UW-ASIC/10G-Ethernet-Parser' }],
};

/** Everything reachable as its own page, i.e. everything with a URL. */
const pages: ProjectInfo[] = [...projects, uwasic];

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Resolves the current URL hash to a page, or null for the home view. */
const pageFromHash = (): ProjectInfo | null => {
  const slug = window.location.hash.replace(/^#\/?/, '');
  return pages.find((page) => slugify(page.title) === slug) ?? null;
};

interface Track {
  name: string;
  artist: string;
  image: string;
  url: string;
}

/** Most recently played Spotify track. Best-effort; failures hide the card. */
const LastPlayed: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/spotify/recently-played')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (!cancelled && data.track) setTrack(data.track);
      })
      .catch(() => {
        /* silently hide the card */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-8 flex items-center gap-4"
    >
      {track.image && (
        <img
          src={track.image}
          alt={track.name}
          className="h-12 w-12 shrink-0 border border-neutral-200 object-cover dark:border-neutral-800"
        />
      )}
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          Last played on Spotify
        </div>
        <div className="mt-0.5 truncate text-sm">
          <span className="font-medium text-neutral-900 underline-offset-4 group-hover:underline dark:text-neutral-100">
            {track.name}
          </span>
          <span className="text-neutral-500"> · {track.artist}</span>
        </div>
      </div>
    </a>
  );
};

const useTheme = () => {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
};

const ThemeToggle: React.FC<{ dark: boolean; toggle: () => void }> = ({ dark, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle color theme"
    className="fixed top-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
  >
    {dark ? (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ) : (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    )}
  </button>
);

function App() {
  const { dark, toggle } = useTheme();
  const [openProject, setOpenProject] = useState<ProjectInfo | null>(pageFromHash);
  const initialized = useRef(false);

  // Each page gets a history entry so the browser's back/forward buttons move
  // between home and a project instead of leaving the site. A deep link is
  // rewritten as home + push, so there is always a home entry to go back to.
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const landed = pageFromHash();
      if (landed) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        window.history.pushState(null, '', `#${slugify(landed.title)}`);
      }
    }
    const onPopState = () => setOpenProject(pageFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openPage = (page: ProjectInfo) => {
    window.history.pushState(null, '', `#${slugify(page.title)}`);
    setOpenProject(page);
  };

  // Closing goes back so the modal and the history stack stay in sync; the
  // popstate handler above is what actually clears the open page.
  const closePage = () => window.history.back();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Dithered wave background; inverted in light mode to stay black/grey */}
      <div className="dither-fade fixed inset-0 z-0 opacity-60 invert dark:opacity-100 dark:invert-0">
        <Dither
          waveColor={[0.35, 0.35, 0.35]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <ThemeToggle dark={dark} toggle={toggle} />
      <Analytics />

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-20 sm:py-28">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mahir Arora</h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Nanotechnology Engineering student at the University of Waterloo, and an
            Electrical Engineering Co-op at Skyjack (Linamar). Currently a Digital
            Design member at{' '}
            <button
              onClick={() => openPage(uwasic)}
              className="font-bold text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-500 dark:hover:decoration-neutral-100"
            >
              UWASIC
            </button>
            , working on ASIC design in Verilog.
          </p>

          {/* Links, in one sentence */}
          <p className="mt-6 text-base text-neutral-600 dark:text-neutral-400">
            Find me on{' '}
            {links.map((link, i) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
                >
                  {link.label}
                </a>
                {i < links.length - 2 ? ', ' : i === links.length - 2 ? ', or my ' : '.'}
              </React.Fragment>
            ))}
          </p>
        </header>

        {/* Projects */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Projects
          </h2>
          <ol className="mt-6 space-y-8">
            {projects.map((project, i) => (
              <li key={project.title} className="flex gap-4">
                <span className="mt-1 w-6 shrink-0 font-mono text-sm text-neutral-400 dark:text-neutral-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="group cursor-pointer"
                  onClick={() => openPage(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openPage(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                    {project.title}
                    {project.hologram && (
                      <span className="ml-2 align-middle font-mono text-[10px] font-normal tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                        3D
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>
                  {project.links && (
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* About */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            About
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>
              I'm passionate about creating technology that makes life smarter, more
              sustainable, and more connected. I'm particularly interested in
              semiconductor manufacturing and advanced lithography, computer
              architecture, FPGAs, and ASICs, and how these technologies enable
              high-performance computing, AI, and automation at scale. I enjoy working
              across robotics, AI, PCB design, and embedded systems, combining hardware
              and software to turn ideas into functional systems. From circuit and PCB
              design to firmware, RTL, and mechanical iteration, I'm drawn to projects
              that sit at the intersection of physics, electronics, and real-world
              impact.
            </p>
            <p>
              Always happy to connect and chat about chips, hardware, or anything at
              the intersection of semiconductors and computing, feel free to reach out!
            </p>
            <p className="text-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Interests
              </span>
              <br />
              Semiconductor Technology, Computer Architecture, FPGA Design, ASIC
              Design, Advanced Manufacturing, Robotics, PCB Design, Embedded Systems,
              CAD
            </p>
          </div>
          <LastPlayed />
        </section>

        <footer className="mt-20 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800">
          © {new Date().getFullYear()} Mahir Arora
        </footer>
      </main>

      {openProject && (
        <ProjectModal project={openProject} onClose={closePage} />
      )}
    </div>
  );
}

export default App;
