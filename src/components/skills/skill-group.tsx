import { SkillGroup as SkillGroupType } from "@/types/skill-component"
import SkillItem from "./skill-item"

type Props = {
  skills: SkillGroupType
}
export default function SkillGroup({ skills }: Props) {

  return <ul className='skills-group'>
    {skills.map((e, i) => <SkillItem skills={e} order={i} key={i} />)}
  </ul>
}
