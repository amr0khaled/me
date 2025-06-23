import { FSObject, FSType } from "@/components/terminal"
import { resolvePath } from "./ls"

export function cd(fs: FSType, inputPath?: string): { newPath?: string, error?: string } {
  const pathParts = resolvePath(fs.current, inputPath)

  let current: FSObject | string | undefined = fs.object
  for (const part of pathParts) {
    if (typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return { error: `cd: no such file or directory: ${inputPath}` }
    }
  }

  if (typeof current === 'string') {
    return { error: `cd: not a directory: ${inputPath}` }
  }

  const newPath = pathParts.join('/') || '~'
  return { newPath }
}
