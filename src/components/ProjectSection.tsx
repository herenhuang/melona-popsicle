import { ProjectCard } from './ProjectCard';
import { Briefcase, Rocket, Award, Mic } from 'lucide-react';
import { FinalRemarks } from './FinalRemarks';
import {
  personalWork,
  professionalWork,
  personalProjects,
  professionalProjects,
  personalAwards,
  professionalAwards,
  personalTalks,
  professionalTalks
} from '../data/projects'; // Import the updated projects data

interface Project {
  title: string;
  description: string;
  link?: string;
  hoverImage?: string;
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
          {/* Work Section */}
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Briefcase className="w-5 h-5" />}
              Work
            </h2>
            {isPersonal ? (
              <>
                {personalWork.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            ) : (
              <>
                {professionalWork.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Rocket className="w-5 h-5" />}
              Projects
            </h2>
            {isPersonal ? (
              <>
                {personalProjects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            ) : (
              <>
                {professionalProjects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            )}
          </div>

          {/* Awards Section */}
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Award className="w-5 h-5" />}
              Awards
            </h2>
            {isPersonal ? (
              <>
                {personalAwards.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            ) : (
              <>
                {professionalAwards.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            )}
          </div>

          {/* Talks Section */}
          <div>
            <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
              {isPersonal && <Mic className="w-5 h-5" />}
              Talks and Media
            </h2>
            {isPersonal ? (
              <>
                {personalTalks.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            ) : (
              <>
                {professionalTalks.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </>
            )}
          </div>

          <FinalRemarks />
        </div>
      </section>
    </div>
  );
}
