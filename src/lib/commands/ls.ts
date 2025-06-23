import { FSObject, FSType } from "@/components/terminal"

export function resolvePath(currentPath: string, inputPath?: string): string[] {
  // Normalize current path (like "~" or "a/b/c")
  const base = currentPath === '~' ? ['~'] : currentPath.split('/').filter(Boolean)

  // If empty or '.', just return current path
  if (!inputPath || inputPath.trim() === '' || inputPath === '.') return base

  const parts = inputPath.trim().split('/').filter(Boolean)
  let resolved: string[] = []

  if (inputPath.startsWith('~')) {
    resolved = ['~', ...parts.slice(1)]
  } else if (inputPath.startsWith('/')) {
    resolved = parts
  } else {
    resolved = [...base]
    for (const part of parts) {
      if (part === '.') continue
      else if (part === '..') {
        if (resolved.length > 1) resolved.pop()
      } else {
        resolved.push(part)
      }
    }
  }

  return resolved
}

export function ls(fs: FSType, args?: string[]): string {
  const pathParts = resolvePath(fs.current, args?.[0])

  let current: FSObject | string | undefined = fs.object
  for (const part of pathParts) {
    if (typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return `ls: cannot access '${args?.[0] ?? fs.current}': No such file or directory`
    }
  }

  if (typeof current === 'object') {
    return Object.keys(current).join('\n')
  } else {
    return `ls: '${args?.[0] ?? fs.current}' is a file`
  }
}
