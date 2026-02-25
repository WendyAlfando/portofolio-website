import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Education from "@/components/sections/Education"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
// import Testimonials from "@/components/sections/Testimonials"
import Organization from "@/components/sections/Organization"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer"
import CustomCursor from "@/components/ui/CustomCursor"

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
