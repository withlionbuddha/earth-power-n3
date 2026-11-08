import type { PageId, Section } from '../types/navigation'
export const sections: Section[] = [
  { id: 'home', label: 'Home', title: 'Ideas in motion.', subtitle: 'A thoughtful space for exploration and discovery.' },
  { id: 'studio', label: 'AI Studio', title: 'Think out loud.', subtitle: 'Make room for the questions that matter.' },
  { id: 'library', label: 'Library', title: 'Keep what matters.', subtitle: 'Every useful piece of knowledge, in one place.' },
  { id: 'insights', label: 'Insights', title: 'See new patterns.', subtitle: 'A clearer view of the work taking shape.' },
  { id: 'settings', label: 'Settings', title: 'Your kind of space.', subtitle: 'Small choices, a more considered experience.' },
]
export const subpages: Record<PageId, string[]> = {
  home: ['Overview', 'Discover', 'Highlights'],
  studio: ['Conversation', 'Prompts', 'Experiments'],
  library: ['Collections', 'Documents', 'References'],
  insights: ['Overview', 'Activity', 'Reports'],
  settings: ['Appearance', 'Preferences', 'About'],
}
