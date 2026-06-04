import React from 'react';

interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  date?: string;
  location?: string;
  highlights?: string[];
}

const Experience: React.FC = () => {
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

  return (
    <div className="p-4 lg:p-8 pt-16 lg:pt-8 mt-16">
      {/* Header */}
      <div className="mb-12 border-b border-dark-border pb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">EXPERIENCE</h1>
        <div className="w-20 h-1 bg-accent"></div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="bg-dark-card border border-dark-border p-6 lg:p-8 hover:border-accent/50 transition-colors duration-300 cursor-target"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight">
                  {exp.role}
                </h3>
                {exp.organizationUrl ? (
                  <a
                    href={exp.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-base lg:text-lg font-semibold hover:underline cursor-target"
                  >
                    {exp.organization}
                  </a>
                ) : (
                  <div className="text-accent text-base lg:text-lg font-semibold">
                    {exp.organization}
                  </div>
                )}
                <div className="w-16 h-0.5 bg-accent mt-2"></div>
              </div>
              <div className="text-left lg:text-right text-gray-400 text-sm font-mono">
                {exp.date && <div>{exp.date}</div>}
                {exp.location && <div className="text-gray-500">{exp.location}</div>}
              </div>
            </div>

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="list-disc list-outside pl-5 text-gray-300 text-sm lg:text-base leading-relaxed space-y-2">
                {exp.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experience;
