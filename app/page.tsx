"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorksSection } from "@/components/works-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen theme-blue">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </main>
  )
}
