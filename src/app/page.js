"use client"
import Navbar from "./components/Navbar";
import ModernHero from "./components/Hero";
import AboutMe from "./components/About";
import SkillsSection from "./components/Skills";
import ProjectsSection from "./components/Projects";
import ConnectSection from "./components/Socials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <ModernHero/>
      <AboutMe/>
      <SkillsSection/>
      <ProjectsSection/>
      <ConnectSection/>
      <Footer/>
    </div>
  );
}
