import { JSX, useState } from 'react'
import '@/style/components/terminal.css'
import { ls } from '@/lib/commands/ls'
import { cd } from '@/lib/commands/cd'

const prompt = "amr@portfolio"
export interface FSObject {
  [key: string]: FSObject | string
}
export type FSType = {
  current: string,
  object?: FSObject | string
}
const fsobject: FSType = {
  current: "~",
  object: {
    "~": {
      projects: {
        fun_noti: "FUN_NOTI"
      },
      'resume.js': "RESUME",
      "contact.md": "CONTACT"
    }
  }
}
export default function TerminalPane({ ...props }) {

  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [history, setHistory] = useState<JSX.Element[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [draftInput, setDraftInput] = useState<string>('')
  const [fs, _setFs] = useState<FSType>(fsobject)
  const setFs = (fstype: FSType) => {
    _setFs(fstype)
  }
  const help = () => {
    return `
Commands: amr, ls, 
`
  }

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.split(' ')
    const newHistory = [...history, <TerminalLine current={fs.current}>
      <span className='terminal-dollar text-orange-400 flex-shrink'>$</span>&nbsp;{cmd}</TerminalLine>]
    let output = ''
    switch (command) {
      case 'help':
        output = help()
        break
      case 'cd':
        if (args) {
          const { newPath: current, error } = cd(fs, args[0])
          if (error) {
            output = error
          } else if (current) {
            setFs({ ...fs, current })
          }
        }
        break
      case 'ls':
        output = ls(fs, args)
        break
      case 'clear':
        setHistory([])
        return
    }
    setHistory([...newHistory, <TerminalLine current={fs.current} noPrompt>{output}</TerminalLine>])
    setHistoryIndex(null)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === 'Enter') {
      handleCommand(input.trim())
      setInput('')
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      setHistoryIndex(prev => {
        if (prev === null) setDraftInput(input)
        const index = prev === null ? commandHistory.length - 1 : Math.max(0, prev - 1)
        setInput(commandHistory[index])
        return index
      })
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      setHistoryIndex(prev => {
        if (prev === null) return null
        const index = prev + 1
        if (index >= commandHistory.length) {
          setInput(draftInput)
          return null
        } else {
          setInput(commandHistory[index])
          return index
        }
      })
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = input.trim()
      if (!trimmed) return

      // Process output (e.g., via runCommand)
      handleCommand(trimmed)

      setCommandHistory(prev => [...prev, trimmed])
      setInput('')
      setHistoryIndex(null)
      setDraftInput('')
    }
  }

  return (
    <div className="pane bg-[#0f111a] font-mono p-4 overflow-y-scroll border border-[#3f475f] rounded-lg">
      {history.map((line, i) => (
        <div className='flex' key={i}>{line}</div>
      ))}
      <div className="w-full flex flex-wrap">
        <TerminalLine current={fs.current} />
        <div className="terminal-input">
          <span className='terminal-dollar'>$</span>
          <input
            className="bg-transparent outline-none text-white flex-1 text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

function TerminalLine({ noPrompt = false, current, children = '' }: { noPrompt?: boolean, current: string, children?: React.ReactNode }) {
  return <div className='terminal-line'>
    {!noPrompt &&
      <><span className='terminal-prompt'>{prompt} <span className='terminal-path'>{current}</span></span>&nbsp;</>}
    {children}
  </div>
}
