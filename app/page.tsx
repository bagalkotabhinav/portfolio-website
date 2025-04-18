// app/page.tsx
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section id="home" className="relative">
          <Hero />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <Link href="#about" scroll={true}>
              <ChevronDown className="h-8 w-8 text-gray-600" />
            </Link>
          </div>
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="skills" className="py-20 bg-gray-50">
          <Skills />
        </section>

        <section id="projects" className="py-20">
          <Projects />
        </section>

        <section id="resume" className="py-20 bg-gray-50">
          <Resume />
        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  )
}