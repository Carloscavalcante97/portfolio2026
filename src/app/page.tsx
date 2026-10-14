import { HeroSection } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { PipelineSection } from "@/components/sections/pipeline";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Marquee />
      <AboutSection />
      <ProjectsSection />
      <PipelineSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
