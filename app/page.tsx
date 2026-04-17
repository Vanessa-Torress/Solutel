"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Navbar />
      <SocialLinks />
      <main className="flex-grow">
        <PageTransition>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
