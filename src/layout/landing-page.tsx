import { Skeleton } from '@/components/ui/skeleton';
import '@/style/layout/landing.css';
import { useEffect, useRef, useState } from 'react';

export default function Landing() {
  const img1 = useRef<HTMLDivElement>(null)
  const img2 = useRef<HTMLDivElement>(null)
  const [{
    width1,
    width2,
    height1,
    height2
  }, setDim] = useState({
    width1: 0,
    width2: 0,
    height1: 0,
    height2: 0,
  })
  useEffect(() => {
    const im1 = img1.current
    const im2 = img2.current
    if (im1 && im2) {
      setDim(e => {
        return {
          ...e,
          width1: im1.offsetWidth,
          width2: im2.offsetWidth,
          height1: im1.offsetHeight,
          height2: im2.offsetHeight,
        }
      })
    }
  }, [])
  return (
    <section className='landing'>
      <div className='img-container'>
        <Skeleton ref={img1} className='aspect-[4/5] w-[264px] rounded-none ' />
        <div style={{ width: width1, height: height1 }} className={`shadow-box -z-99`}></div>
      </div>
      <span className='name'>
        Amr Khaled
      </span>
      <p className='paragraph'>
        This is a paragraph
      </p>
      <div className='img-container'>
        <Skeleton ref={img2} className='aspect-[5/4] h-[284px] rounded-none ' />
        <div style={{ width: width2, height: height2 }} className={`shadow-box -z-99`}></div>
      </div>
    </section>
  )
}
