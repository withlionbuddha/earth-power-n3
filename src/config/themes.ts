import type { ThemeId } from '../types/navigation'
export const themes: { id: ThemeId; name: string; description: string; swatch: string }[] = [
  { id: 'sage', name: 'Sage', description: 'Botanical green & warm paper', swatch: '#a2b6a1' },
  { id: 'midnight', name: 'Midnight', description: 'Dark ink & silver', swatch: '#29344c' },
  { id: 'ocean', name: 'Ocean', description: 'Deep blue & cool white', swatch: '#74a5bc' },
  { id: 'rose', name: 'Rose', description: 'Dusty pink & soft cream', swatch: '#caa3a4' },
  { id: 'sand', name: 'Sand', description: 'Warm clay & ivory', swatch: '#d2ad81' },
]

export const themeStorageKey = 'earth-power-n3-theme'
