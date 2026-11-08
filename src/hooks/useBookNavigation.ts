import { useEffect, useRef, useState } from 'react'
import { sections, subpages } from '../config/navigation'
import type { PageId } from '../types/navigation'
export function useBookNavigation() {
  const [current, setCurrent] = useState<PageId>('home')
  const [visible, setVisible] = useState<PageId>('home')
  const [subpage, setSubpage] = useState(0)
  const [screen, setScreen] = useState(0)
  const screenRef = useRef(0)
  const wheelLocked = useRef(false)
  const [turning, setTurning] = useState(false)
  const pending = useRef<PageId | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const index = sections.findIndex(s => s.id === current)
  const page = sections.find(s => s.id === current)!
  function navigate(id: PageId) {
    if (turning) { pending.current = id; return }
    if (id === current) return
    setCurrent(id)
    setSubpage(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(id); return }
    setTurning(true)
    timer.current = window.setTimeout(() => {
      setVisible(id)
      setTurning(false)
      const next = pending.current
      pending.current = null
      if (next && next !== id) setTimeout(() => navigateNext(next), 0)
    }, 680)
  }
  // A queued selection is applied after the previous animation finishes.
  function navigateNext(id: PageId) { setCurrent(id); setVisible(id) }
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const shift = (direction: number) => {
    const count = subpages[current].length
    setSubpage(value => Math.max(0, Math.min(count - 1, value + direction)))
  }
  function goScreen(next: number) {
    const clamped = Math.max(0, Math.min(4, next))
    screenRef.current = clamped
    setScreen(clamped)
  }
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 5) return
      event.preventDefault()
      if (wheelLocked.current) return
      const direction = event.deltaY < 0 ? 1 : -1
      const next = Math.max(0, Math.min(4, screenRef.current + direction))
      if (next === screenRef.current) return
      goScreen(next)
      wheelLocked.current = true
      window.setTimeout(() => { wheelLocked.current = false }, 750)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])
  return { current, visible, subpage, screen, turning, index, page, navigate, shift, goScreen }
}
