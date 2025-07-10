import SkillGroup from "@/components/skills/skill-group";
import { SkillGroup as SkillGroupType } from "@/types/skill-component";
import { useState } from "react";
import '@/style/layout/skills.css'


export default function SkillsSection() {
  const [skillsTitle] = useState<string[]>([
    "Full Stack Developer",
  ])
  const [skillsTitleOrder] = useState(0)
  const [skillsGroup] = useState<SkillGroupType>([
    ['React', 'Typescript'],
    ['Laravel', 'MySQL / MariaDB'],
    ['Tailwind CSS', 'Shadcn']
  ])
  const [desc] = useState<string>('This\nIs\nParagraph\n')
  return <section className='skills-section section'>
    <div className='divider'></div>
    <header className='skills-header'>
      <h1 className='title'>
        ~/Skills/{skillsTitle[skillsTitleOrder]}
      </h1>
    </header>
    <main className='skills-container'>
      <div className='skills-desc-container'>
        <p className='skills-desc'>
          {desc}
        </p>
      </div>
      <SkillGroup skills={skillsGroup} />
    </main>
  </section>
}
