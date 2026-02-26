import dynamic from "next/dynamic"
import Hero from "@/components/sections/Hero"
import CustomCursor from "@/components/ui/CustomCursor"

// Lazy load below-fold sections for better initial page load
const About = dynamic(() => import("@/components/sections/About"))
const Education = dynamic(() => import("@/components/sections/Education"))
const Experience = dynamic(() => import("@/components/sections/Experience"))
const Projects = dynamic(() => import("@/components/sections/Projects"))
const Skills = dynamic(() => import("@/components/sections/Skills"))
// const Testimonials = dynamic(() => import("@/components/sections/Testimonials"))
const Organization = dynamic(() => import("@/components/sections/Organization"))
const Contact = dynamic(() => import("@/components/sections/Contact"))
const Footer = dynamic(() => import("@/components/layout/Footer"))

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      {/* <Testimonials /> */}
      <Organization />
      <Contact />
      <Footer />
    </>
  )
}
