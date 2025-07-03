
import { PointerContainerContext } from '@/hooks/pointer-context'
import { cn } from '@/lib/utils'
import '@/style/components/pointer.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function Pointer() {
  const [old, setOld] = useState({ x: 0, y: 0 })
  const [pos] = useDebounce(old, 0, {
    maxWait: 50
  })
  const container = useContext(PointerContainerContext)
  const pointer = useRef<HTMLDivElement>(null)
  const [inPlace, setShow] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (container) {
        setShow(() => {
          const rect = container.getBoundingClientRect()
          const deadzone = 10
          if (e.x < rect.x + deadzone || e.x > (rect.x + rect.width - deadzone)) {
            return false;
          }
          if (e.y < rect.y + deadzone || e.y > (rect.y + rect.height - deadzone)) {
            return false;
          }
          return true
        })
      }
      setOld({ x: e.x + 8, y: e.y + 8 })
    }
    if (container) {
      container.addEventListener('mouseenter', move)
      container.addEventListener('mousemove', move)
    }
    return () => {
      container?.removeEventListener('mousemove', move)
      container?.removeEventListener('mouseenter', move)
    }
  }, [container, pointer])
  return <div
    ref={pointer}
    className={cn('mouse-pointer', inPlace ? 'block' : 'hidden', 'absolute')}
    style={{
      top: pos.y,
      left: pos.x
    }}
    onClick={e => e.preventDefault()}
  >
    <div className='flex items-center justify-center w-full h-full text-foreground invert font-bold'>
      Click
    </div>
  </div>
}
