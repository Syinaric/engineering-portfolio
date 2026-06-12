import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  date?: string;
  location?: string;
  highlights?: string[];
}

const experiences: ExperienceEntry[] = [
  {
    id: 'skyjack',
    role: 'Electrical Engineering Intern',
    organization: 'Skyjack (Linamar)',
    organizationUrl: 'https://www.skyjack.com/',
    date: 'May 2026 – Aug 2026',
    location: 'Guelph, ON',
    highlights: [
      'Ran and debugged truth table and sequence tests on machine dashboards, debugging failed test cases to identify issues in dashboard logic, display behavior, and test outputs',
      'Created a MATLAB script for Simulink that automated a highly manual dashboard creation process, saving 8 hours per machine',
      'Developed multiple Excel VBA macros that reduced testing by 3 hours and made results easier to view, analyze, and apply',
      'Designed a custom PCB to replace a machine harness on a boom lift, routing signals between a Speedgoat controller, ECU 6 I/O modules, 4 solenoid relays, and dual 300A motor driver',
    ],
  },
  {
    id: 'uwasic',
    role: 'Digital Design Member',
    organization: 'UWASIC (UW ASIC Design Club)',
    organizationUrl: 'https://uwasic.ca/',
    date: 'Mar 2026 – Present',
    location: 'University of Waterloo',
    highlights: [
      'Contributing to the ethernet project, designing and verifying hardware modules for real-time ray intersection and lighting computation in silicon',
      'Completed onboarding by designing a fully functional SPI peripheral in Verilog with CDC synchronization, register mapping, and PWM output control, verified using a custom cocotb testbench',
      'Working within the Tiny Tapeout ASIC design flow, producing GDS files using OpenLane and Yosys for potential physical fabrication',
    ],
  },
];

/** Decorative floating glyphs that parallax at their own speeds. */
const FloatingGlyphs: React.FC = () => (
  <>
    {[
      { txt: '+', top: '18%', left: '8%', speed: -60, size: 'text-3xl' },
      { txt: '[ ]', top: '34%', left: '88%', speed: -120, size: 'text-xl' },
      { txt: '0x4D41', top: '55%', left: '5%', speed: -90, size: 'text-sm' },
      { txt: '//', top: '70%', left: '90%', speed: -150, size: 'text-2xl' },
      { txt: '+', top: '85%', left: '12%', speed: -40, size: 'text-xl' },
      { txt: 'GND', top: '25%', left: '75%', speed: -70, size: 'text-xs' },
      { txt: 'VCC', top: '78%', left: '80%', speed: -100, size: 'text-xs' },
    ].map((g, i) => (
      <span
        key={i}
        data-speed={g.speed}
        className={`glyph absolute font-mono text-accent/25 select-none pointer-events-none ${g.size}`}
        style={{ top: g.top, left: g.left }}
      >
        {g.txt}
      </span>
    ))}
  </>
);

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header intro
      gsap.fromTo(
        '.exp-hero-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );

      // Ghost title parallax
      gsap.to('.exp-ghost', {
        yPercent: 45,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // The circuit trace draws itself as you scroll.
      gsap.fromTo(
        '.trace-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.trace-wrap',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        }
      );

      // Nodes pulse on when the trace reaches them.
      gsap.utils.toArray<HTMLElement>('.trace-node').forEach((node) => {
        gsap.fromTo(
          node,
          { backgroundColor: '#1a1a1a', boxShadow: '0 0 0 rgba(162,89,255,0)' },
          {
            backgroundColor: '#a259ff',
            boxShadow: '0 0 24px rgba(162,89,255,0.9)',
            duration: 0.4,
            scrollTrigger: { trigger: node, start: 'top 62%', toggleActions: 'play none none reverse' },
          }
        );
      });

      // Cards slide in from their side.
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        const fromLeft = card.classList.contains('from-left');
        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        );
      });

      // Highlights cascade.
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('li'),
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 70%' },
          }
        );
      });

      // Floating glyphs at independent parallax speeds.
      gsap.utils.toArray<HTMLElement>('.glyph').forEach((el) => {
        gsap.to(el, {
          y: Number(el.dataset.speed || -50),
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <FloatingGlyphs />

      {/* Hero */}
      <div className="relative min-h-[55vh] flex flex-col justify-center px-6 lg:px-16">
        <div
          className="exp-ghost absolute top-[8%] left-0 right-0 text-center font-bold tracking-tighter select-none pointer-events-none text-[16vw] leading-none text-transparent opacity-40"
          style={{ WebkitTextStroke: '1px rgba(162,89,255,0.22)' }}
        >
          EXPERIENCE
        </div>
        <div className="relative max-w-5xl">
          <div className="exp-hero-line font-mono text-accent text-xs tracking-[0.4em] mb-6">
            WHERE I'VE WORKED
          </div>
          <h1 className="exp-hero-line text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
            EXPER<span className="text-accent">IENCE</span>
          </h1>
        </div>
      </div>

      {/* Circuit-trace timeline */}
      <div className="trace-wrap relative max-w-[1200px] mx-auto px-4 lg:px-8 pb-32">
        {/* the trace */}
        <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[2px] bg-dark-border lg:-translate-x-1/2">
          <div className="trace-line absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent to-accent/30" />
        </div>

        <div className="space-y-20 lg:space-y-28 pt-10">
          {experiences.map((exp, i) => {
            const left = i % 2 === 0;
            return (
              <div key={exp.id} className="relative">
                {/* node on the trace */}
                <div className="trace-node absolute left-5 lg:left-1/2 top-2 w-4 h-4 -translate-x-1/2 rotate-45 border border-accent z-10" />

                <div
                  className={`exp-card ${left ? 'from-left' : 'from-right'} opacity-0 relative ml-12 lg:ml-0 lg:w-[calc(50%-3.5rem)] ${
                    left ? 'lg:mr-auto' : 'lg:ml-auto'
                  }`}
                >
                  {/* connector from trace to card */}
                  <div
                    className={`hidden lg:block absolute top-4 h-[2px] w-14 bg-accent/40 ${
                      left ? '-right-14' : '-left-14'
                    }`}
                  />

                  <article className="cursor-target group bg-dark-card/80 backdrop-blur-sm border border-dark-border hover:border-accent/60 transition-colors duration-300 p-6 lg:p-8">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="shrink-0 font-mono text-[10px] text-accent border border-accent/40 bg-accent/10 px-2 py-1 tracking-[0.15em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {exp.organizationUrl ? (
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target text-accent text-base lg:text-lg font-semibold hover:underline"
                      >
                        {exp.organization}
                      </a>
                    ) : (
                      <div className="text-accent text-base lg:text-lg font-semibold">
                        {exp.organization}
                      </div>
                    )}

                    <div className="font-mono text-xs text-gray-500 mt-2 mb-4">
                      {exp.date}
                      {exp.location ? ` · ${exp.location}` : ''}
                    </div>
                    <div className="w-16 h-0.5 bg-accent mb-4 group-hover:w-28 transition-all duration-500" />

                    {exp.highlights && (
                      <ul className="space-y-2.5 text-gray-300 text-sm leading-relaxed">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-accent font-mono shrink-0">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
