"use client";
import { useState } from "react";
import PageLoader from "@/components/layout/PageLoader";
import Hero from "@/components/sections/Hero";
import SkillsAchievements from "@/components/sections/SkillsAchievements";
import ProjectsNew from "@/components/sections/ProjectsNew";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <main>
      <Hero />
      <ProjectsNew />
      <SkillsAchievements />
      <Contact />
    </main>
  );
}