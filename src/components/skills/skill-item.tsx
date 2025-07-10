import { Skills } from "@/types/skill-component"

type Props = {
  order: number,
  skills: Skills
}
export default function SkillItem({ order, skills }: Props) {
  return <li className='skill-item'>
    <span className='skill-order'>0x{order.toString(16)}</span>
    <span className='skill-content'>{skills.join(", ")}</span>
  </li>
}
