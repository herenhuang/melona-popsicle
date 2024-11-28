import { ProjectCard } from './ProjectCard';
import { Briefcase, Rocket, Award, Mic, Heart } from 'lucide-react';
import { FinalRemarks } from './FinalRemarks';

interface Project {
  title: string;
  description: string;
  link?: string;
}

interface SectionProps {
  work: Project[];
  projects: Project[];
  awards: Project[];
  talks: Project[];
  isPersonal: boolean;
}

export function ProjectSection({ work, projects, awards, talks, isPersonal }: SectionProps) {
  return (
    <div className="py-12 space-y-20 max-w-3xl">
      <section>
        <div className="space-y-20">
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Briefcase className="w-5 h-5" />}
              Work
            </h2>
            {work.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Rocket className="w-5 h-5" />}
              Projects
            </h2>
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Award className="w-5 h-5" />}
              Awards
            </h2>
            {awards.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Mic className="w-5 h-5" />}
              Talks and Media
            </h2>
            {talks.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <FinalRemarks />
        </div>
      </section>
    </div>
  );
}