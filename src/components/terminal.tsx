import { createContext, JSX, useContext, useState } from 'react'
import '@/style/components/terminal.css'

const prompt = "amr@portfolio"
interface FSObject {
  [key: string]: FSObject | string
}
type FSType = {
  current: string,
  object?: FSObject | string
}
const fs: FSType = {
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

  const [history, setHistory] = useState<JSX.Element[]>([])
  const [input, setInput] = useState('')
  const [fsobject, _setFs] = useState<FSType>(fs)
  const setFs = (fstype: FSType) => {
    _setFs(fstype)
  }
  const cd = (dir: string) => {
    const dirs = dir.split('/')
    const object: FSObject | string | undefined = fsobject?.object[fsobject.current]
    let _object: FSObject | string = fs?.object[dirs[0]]
    function getObject(dir: string = '') {
      const dirs = fsobject.current.split('/') + dir
      for (const dir of dirs) {
        if (_object) {
          _object = _object[dir] as string | FSObject
        }
      }
    }
    if (dir.startsWith('..')) {
      const __toDirs = dir.split('/').length
      const _dirs = fs.current.split('/')
      for (let i = 0; i < __toDirs; i++) {
        _dirs.pop()
      }
      fs.current = _dirs.join('/')
    } else {
      const __toDirs = dir.split('/')
      if (dir.startsWith("./")) {
        __toDirs.shift()
      }
      fs.current += __toDirs.join('/')
    }
  }

  const help = () => {
    return `
Commands: amr, ls, 
`
  }
  const ls = (dir = '') => {
    const dirs = dir.split('/')
    if (fs) {
      console.log(fs)
      let _object: FSObject | string = fs.object[dirs[0]]
      function getObject(dir: string = '') {
        const dirs = dir.split('/')
        console.log("-bject", _object)
        for (const _dir of dirs) {
          _object = _object[_dir]
        }
      }
      if (dir.startsWith('..')) {
        const __toDirs = dir.split('/').length
        const _dirs = fs.current.split('/')
        for (let i = 0; i < __toDirs; i++) {
          _dirs.pop()
        }
        getObject()
        return
      } else if (dir === '.') {
        getObject()
        if (typeof _object === 'string') {
          return _object
        } else {
          return Object.keys(_object).join('\n')
        }
      } else if (dir.startsWith("./")) {
        const __toDirs = dir.split('/')
        __toDirs.shift()
        getObject(__toDirs.join('/'))
        {
          return Object.keys(_object).join('\n')
        }
      } else {
        getObject()
        return Object.keys(_object).join('\n')
      }
    }
    return 's'
  }

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.split(' ')
    const newHistory = [...history, <TerminalLine>{cmd}</TerminalLine>]
    let output = ''
    switch (command) {
      case 'help':
        output = help()
        break
      case 'cd':
        if (args) {
          cd(args[0])
        }
        break
      case 'ls':
        if (args) {
          output = ls(args[0])
        }
        break
    }
    if (cmd === 'help') output = 'Commands: help, about, clear'
    else if (cmd === 'clear') return setHistory([])
    else if (cmd === 'about') output = 'I’m Amr – terminal UI enjoyer.'
    else output = `Unknown command: ${cmd}`

    setHistory([...newHistory, <TerminalLine noPrompt>{output}</TerminalLine>])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input.trim())
      setInput('')
    }
  }

  return (
    <div className="pane bg-[#0f111a] font-mono p-4 overflow-y-scroll border border-[#3f475f] rounded-lg">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="flex">
        <TerminalLine />
        <input
          className="bg-transparent outline-none text-white flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  )
}

function TerminalLine({ noPrompt = false, children = '' }: { noPrompt?: boolean, children?: React.ReactNode }) {
  return <div className='terminal-line'>
    {!noPrompt &&
      <><span className='terminal-prompt'>{prompt} <span className='terminal-dollar'>$</span></span>&nbsp;</>}
    {children}
  </div>
}
