import Contact from "@/layout/contact"
import Header from "@/layout/header"
import Landing from "@/layout/landing-page"
import Projects from "@/layout/projects"
import SkillsSection from "@/layout/skills"


export default function Home() {
  return (
    <>
      <Header />
      <Landing />
      <SkillsSection />
      <Projects />
      <Contact />
    </>
  )
}
