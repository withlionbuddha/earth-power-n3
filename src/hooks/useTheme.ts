import { useState } from 'react'
import { themes, themeStorageKey } from '../config/themes'
import type { ThemeId } from '../types/navigation'
export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try { const stored = window.localStorage.getItem(themeStorageKey); return themes.some(option => option.id === stored) ? stored as ThemeId : 'sage' }
    catch { return 'sage' }
  })
  function changeTheme(next: ThemeId) {
    setTheme(next)
    try { window.localStorage.setItem(themeStorageKey, next) } catch { /* Storage may be disabled. */ }
  }
  return { theme, changeTheme }
}
