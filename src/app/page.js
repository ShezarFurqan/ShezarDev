import Hero from "@/components/Hero";
import WorkPreview from "@/components/WorkPreview";
import About from "@/components/About";
import ServicesPreview from "@/components/ServicesPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { HOME_METADATA } from "@/data/site";

export const metadata = HOME_METADATA;

export default function Home() {
  return (
    <>
      <main>
        <JsonLd />
        <Hero />
        <WorkPreview />
        <About />
        <ServicesPreview />
        <Contact />
      </main>
    </>
  );
}