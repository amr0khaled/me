import '@/style/layout/projects.css';
import { useState } from 'react';

type Project = {
  title: string
  images: string[]
  description: string
}

export default function Projects() {
  const [project, setProject] = useState<Project>({
    title: "Test",
    images: [],
    description: 'description'
  });
  const [projects, setProjects] = useState<Project[]>([])
  return <section className='projects-section section'>
    <header>
      <div className='divider'></div>
      <h1 className='title'>~/Projects/{project.title}</h1>
      <div className='divider'></div>
    </header>
    <main className='body'>
      <section className='description-section'>
        <p className='description'>
          {project.description}
        </p>
      </section>
      <div className='divider-vertical'></div>
      <section className='image-section'>
        <div className='image-frame'>
          <img />
        </div>
      </section>
    </main>
  </section>
}
