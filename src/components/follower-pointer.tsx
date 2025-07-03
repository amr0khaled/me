import { PointerContainerContext } from "@/hooks/pointer-context";
import Pointer from "./pointer";
import { cloneElement, useEffect, useRef, useState } from "react";

export function FollowPointer({ children }: { children: React.ReactElement }) {
  const [com, setCom] = useState<HTMLElement | null>(null)
  const componentRef = useRef<HTMLElement | null>(null)
  const component = cloneElement<Record<string, React.RefObject<HTMLElement | null>>>(children, { ref: componentRef })


  useEffect(() => {
    if (componentRef.current) {
      setCom(componentRef.current)
    }
  }, [com, componentRef])
  return (
    <PointerContainerContext.Provider value={com}>
      {component}
      <Pointer />
    </PointerContainerContext.Provider>
  )
}
