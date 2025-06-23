import { KeyboardEventHandler, useMemo, useState } from "react";
import TerminalPane from "./terminal";
import '@/style/components/tmux.css'
import { cn } from "@/lib/utils";

export default function Tmux({ ...props }: React.ComponentProps<'div'>) {
  const [sessions, setSessions] = useState<React.JSX.Element[]>([
    <TerminalPane />,
    <span >He</span>,
    <TerminalPane />,
  ])
  const [session, setSession] = useState<React.JSX.Element>(sessions[0])
  const [names, setNames] = useState<string[]>(['terminal', 'terminal', 'terminal'])
  const [index, setIndex] = useState(0)


  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.altKey && e.shiftKey) {
      e.preventDefault()
      switch (e.key) {
        case 'L':
          setIndex(e => {
            let nextIndex = e + 1
            if (nextIndex > names.length - 1) {
              nextIndex = 0
            }
            setSession(sessions[nextIndex])
            return nextIndex
          })
          break
        case 'H':
          setIndex(e => {
            let prevIndex = e - 1
            if (prevIndex < 0) {
              prevIndex = names.length - 1
            }
            setSession(sessions[prevIndex])
            return prevIndex
          })
      }
    }
  }

  return <div {...props} className={cn('tmux', props.className)} onKeyDownCapture={handleKeyDown}>
    <main className='tmux-session'>
      {session}
    </main>
    <footer className='tmux-footer'>
      {names.map((name, i) =>
        <div className={`session ${i === index ? "active" : ''}`} onClick={() => setIndex(() => { setSession(sessions[i]); return i })} data-selected={i === index} key={i}><span className='session-index'>{i}</span>{name}</div>
      )}
    </footer>
  </div>
}
