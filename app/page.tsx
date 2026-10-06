import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import About from "@/components/sections/About";
import Industries from "@/components/sections/Industries";
import Products from "@/components/sections/Products";
import VisionMission from "@/components/sections/VisionMission";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Industries />
      <Products />
      <VisionMission />
      <Team />
      <CTA />
      <Contact />
    </>
  );
}
