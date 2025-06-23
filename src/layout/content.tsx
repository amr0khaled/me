import About from "@/sections/about"
import { useIsMobile } from "@/hooks/is-mobile"


export default function Content() {
  const isMobile = useIsMobile()
  return (
    <main className='flex justify-center items-center min-h-[90vh]'>
      <About />
    </main>
  )
}
