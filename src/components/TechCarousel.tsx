import React from 'react';
import { 
  SiDotnet, SiReact, SiPostgresql, SiGit, 
  SiRedis, SiDocker, SiPython, SiNodedotjs, SiDotnet as SiAspnet, 
  SiAwslambda, SiGooglecloud, SiTypescript, SiExpress, SiNextdotjs
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { TbBrandCSharp } from 'react-icons/tb';
import { FaWindows, FaDatabase } from 'react-icons/fa';

// Mapping for icons
const techs = [
  { name: '.NET', icon: SiDotnet, color: '#512BD4' },
  { name: 'C#', icon: TbBrandCSharp, color: '#239120' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: undefined },
  { name: 'Postgres', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MSSQL', icon: FaDatabase, color: '#CC2927' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, color: undefined },
  { name: 'ASP.NET', icon: SiAspnet, color: '#512BD4' },
  { name: 'WPF', icon: FaWindows, color: '#0078D6' }, 
  { name: 'AWS', icon: SiAwslambda, color: '#FF9900' },
  { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Azure', icon: VscAzure, color: '#0078D4' },
];

export default function TechCarousel() {
  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden py-4">
      <h3 className="text-3xl md:text-4xl font-bold px-8">Technologies</h3>
      
      {/* Spacer is automatic due to justify-between, but we ensure carousel is at bottom */}
      <div className="relative w-full overflow-hidden mt-auto">
        {/* Added w-max to ensure full content width is calculated for the transform */}
        <div className="flex w-max animate-scroll whitespace-nowrap hover:pause mt-4">
          {[...techs, ...techs].map((tech, index) => (
            /* Using mr-12 for wider spacing between items */
            <div key={`${tech.name}-${index}`} className="flex flex-col items-center justify-center flex-shrink-0 w-24 mr-12">
              <tech.icon className="w-12 h-12 mb-3 transition-transform hover:scale-110" style={{ color: tech.color }} />
              <span className="text-sm font-bold opacity-80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
