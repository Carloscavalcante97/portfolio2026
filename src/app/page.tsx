import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { BeyondSection } from "@/components/sections/beyond";
import { PipelineSection } from "@/components/sections/pipeline";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BeyondSection />
      <PipelineSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
