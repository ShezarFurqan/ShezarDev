import Hero from "@/components/Hero";
import WorkPreview from "@/components/WorkPreview";
import About from "@/components/About";
import ServicesPreview from "@/components/ServicesPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkPreview />
      <About />
      <ServicesPreview />
      <Contact/>
      <Footer/>
    </main>
  );
}