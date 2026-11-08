import { useEffect, useRef, useState } from 'react'
import './App.css'

type PageId = 'home' | 'studio' | 'library' | 'insights' | 'settings'
const sections: { id: PageId; label: string; title: string; subtitle: string }[] = [
  { id: 'home', label: 'Home', title: 'Ideas in motion.', subtitle: 'A thoughtful space for exploration and discovery.' },
  { id: 'studio', label: 'AI Studio', title: 'Think out loud.', subtitle: 'Make room for the questions that matter.' },
  { id: 'library', label: 'Library', title: 'Keep what matters.', subtitle: 'Every useful piece of knowledge, in one place.' },
  { id: 'insights', label: 'Insights', title: 'See new patterns.', subtitle: 'A clearer view of the work taking shape.' },
  { id: 'settings', label: 'Settings', title: 'Your kind of space.', subtitle: 'Small choices, a more considered experience.' },
]
type ThemeId = 'sage' | 'midnight' | 'ocean' | 'rose' | 'sand'
const themes: { id: ThemeId; name: string; description: string; swatch: string }[] = [
  { id: 'sage', name: 'Sage', description: 'Botanical green & warm paper', swatch: '#a2b6a1' },
  { id: 'midnight', name: 'Midnight', description: 'Dark ink & silver', swatch: '#29344c' },
  { id: 'ocean', name: 'Ocean', description: 'Deep blue & cool white', swatch: '#74a5bc' },
  { id: 'rose', name: 'Rose', description: 'Dusty pink & soft cream', swatch: '#caa3a4' },
  { id: 'sand', name: 'Sand', description: 'Warm clay & ivory', swatch: '#d2ad81' },
]
const themeStorageKey = 'earth-power-n3-theme'
const sampleFiles = [
  { name: 'Project notes', desc: 'Ideas, plans and first thoughts', type: 'NOTEBOOK' },
  { name: 'Research references', desc: 'Readings and useful sources', type: 'COLLECTION' },
  { name: 'Design inspirations', desc: 'Visual language and mood', type: 'MOODBOARD' },
]
function Interior({ id, navigate, theme, onThemeChange }: { id: PageId; navigate: (p: PageId) => void; theme: ThemeId; onThemeChange: (t: ThemeId) => void }) {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<{ role: 'me' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to the studio. What would you like to explore?' },
  ])
  if (id === 'home') return <>
    <div className="page-overline"><span>AN INVITATION TO EXPLORE</span><span className="quiet-status">● &nbsp; SPACE READY</span></div>
    <div className="home-intro"><div className="asterisk">✳</div><h2>Where curiosity<br/><em>finds direction.</em></h2>
      <p>A place to think, make, collect, and see ideas from a different angle. Begin anywhere.</p>
      <button className="action" onClick={() => navigate('studio')}>Explore AI Studio <span>↗</span></button>
    </div>
    <div className="cards">
      <button onClick={() => navigate('studio')}><small>01 / CREATE</small><b>↗</b><strong>Think freely.</strong><span>Build on a new idea.</span></button>
      <button onClick={() => navigate('library')}><small>02 / COLLECT</small><b>↗</b><strong>Stay curious.</strong><span>Save what inspires you.</span></button>
      <button onClick={() => navigate('insights')}><small>03 / EXPLORE</small><b>↗</b><strong>Look closer.</strong><span>Discover new patterns.</span></button>
    </div>
  </>
  if (id === 'studio') return <>
    <div className="page-overline"><span>AN OPEN CANVAS</span><span className="quiet-status">DEMO MODE</span></div>
    <h2 className="section-title">Start with<br/><em>a question.</em></h2><p className="section-subtitle">A simple conversation space for your next experiment.</p>
    <div className="chat">
      <div className="chat-head"><span className="chat-avatar">✳</span><strong>Studio Assistant</strong><span className="quiet-status">● Preview</span></div>
      <div className="chat-body" aria-live="polite">{chat.map((item, i) => <p key={i} className={'bubble ' + item.role}>{item.text}</p>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); if (!message.trim()) return; setChat(c => [...c, { role: 'me', text: message.trim() }, { role: 'ai', text: 'This is a design preview. Connect an AI API to enable model responses.' }]); setMessage('') }}>
        <input aria-label="Your message" placeholder="Ask something interesting..." value={message} onChange={e => setMessage(e.target.value)}/><button type="submit" aria-label="Send message">↗</button>
      </form>
    </div>
  </>
  if (id === 'library') return <>
    <div className="page-overline"><span>YOUR COLLECTION</span><span className="quiet-status">SAMPLE CONTENT</span></div>
    <h2 className="section-title">Everything worth<br/><em>keeping.</em></h2><p className="section-subtitle">Notes, documents and references—together at last.</p>
    <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} aria-label="Search the library" placeholder="Search the collection"/></label>
    <div className="file-list">{sampleFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map((f, i) => <div className="file-row" key={f.name}><small>0{i + 1}</small><span className="file-icon">▤</span><span className="file-main"><strong>{f.name}</strong><span>{f.desc}</span></span><small className="file-type">{f.type}</small><span>↗</span></div>)}</div>
  </>
  if (id === 'insights') return <>
    <div className="page-overline"><span>YOUR WORK, IN PERSPECTIVE</span><span className="quiet-status">SAMPLE DATA</span></div>
    <h2 className="section-title">Notice the<br/><em>small patterns.</em></h2><p className="section-subtitle">A snapshot of ideas and activity, at a glance.</p>
    <div className="metric-grid"><div><small>PROJECTS</small><strong>08</strong><span>Current workspace</span></div><div><small>EXPLORATIONS</small><strong>24</strong><span>Ideas in progress</span></div><div><small>COLLECTIONS</small><strong>06</strong><span>Useful references</span></div></div>
    <div className="chart"><div className="chart-top"><strong>Creative momentum</strong><small>LAST 7 DAYS</small></div><div className="bars">{[49,72,61,89,64,95,77].map((v, i) => <div key={i}><span style={{ height: v + '%' }}/><small>{['M','T','W','T','F','S','S'][i]}</small></div>)}</div></div>
  </>
  return <>
    <div className="page-overline"><span>WORKSPACE PREFERENCES</span><span className="quiet-status">PERSONALIZE</span></div>
    <h2 className="section-title">Make it<br/><em>your own.</em></h2><p className="section-subtitle">A few details to shape your everyday flow.</p>
    <div className="theme-heading">Choose a design theme <span>LIVE PREVIEW</span></div>
    <div className="theme-grid" role="group" aria-label="Design themes">
      {themes.map(option => <button type="button" key={option.id} className={'theme-option' + (theme === option.id ? ' selected' : '')} aria-pressed={theme === option.id} onClick={() => onThemeChange(option.id)}>
        <span className="theme-swatch" style={{ background: option.swatch }} aria-hidden="true" />
        <span className="theme-text"><strong>{option.name}</strong><small>{option.description}</small></span>
        <span className="theme-check" aria-hidden="true">{theme === option.id ? '✓' : '○'}</span>
      </button>)}
    </div>
    <p className="demo-caption">The selected theme is saved in this browser. Other settings are a preview.</p>
  </>
}

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const stored = window.localStorage.getItem(themeStorageKey)
      return themes.some(option => option.id === stored) ? stored as ThemeId : 'sage'
    } catch { return 'sage' }
  })
  function changeTheme(next: ThemeId) {
    setTheme(next)
    try { window.localStorage.setItem(themeStorageKey, next) } catch { /* Storage may be disabled. */ }
  }
  const [current, setCurrent] = useState<PageId>('home')
  const [visible, setVisible] = useState<PageId>('home')
  const [turning, setTurning] = useState(false)
  const pending = useRef<PageId | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const index = sections.findIndex(s => s.id === current)
  const page = sections.find(s => s.id === current)!
  function navigate(id: PageId) {
    if (turning) { pending.current = id; return }
    if (id === current) return
    setCurrent(id)
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
  const shift = (direction: number) => navigate(sections[(index + direction + sections.length) % sections.length].id)
  return <div className="app-shell" data-theme={theme}>
    <div className="ambient-ring" aria-hidden="true"/>
    <section className="top-zone">
      <header className="topbar"><a className="brand" href="#home" onClick={e => { e.preventDefault(); navigate('home') }}><span className="brand-circle">e<span>.</span></span><strong>earth power <i>/ n3</i></strong></a><span className="topbar-center">A DIGITAL THINKING SPACE &nbsp; ✳</span><span className="topbar-end"><span className="status-dot"/> EXPLORATION MODE</span></header>
      <div className="top-content"><div className="top-kicker">THE NEW CREATIVE WORKSPACE <span>——</span> EDITION 001</div><div className="hero-row"><h1>Think beyond<br/><em>the ordinary.</em></h1><p>For the curious, the makers,<br/>and the questions yet to be asked.</p></div><div className="hero-footer"><span>EVERY IDEA DESERVES A SPACE</span><span>DISCOVER YOUR NEXT CHAPTER &nbsp; ↗</span></div></div>
    </section>
    <section className="book-zone" aria-label="Interactive content pages">
      <div className="book-shadow"/>
      <div className="book">
        <div className="book-cover"><div className="book-topline"><span>THE EARTH POWER JOURNAL</span><span>VOL. 001</span></div><div className="orbit" aria-hidden="true"/><div className="cover-copy"><span>0{index + 1} / {page.label.toUpperCase()}</span><h2>{page.title.split(' ').slice(0, 2).join(' ')}<br/><em>{page.title.split(' ').slice(2).join(' ')}</em></h2><p>{page.subtitle}</p></div><div className="cover-footer"><span>EP / N3</span><span>AN INTERACTIVE NOTEBOOK</span></div></div>
        <div className="book-page"><div className="page-inner" key={visible}><Interior id={visible} navigate={navigate} theme={theme} onThemeChange={changeTheme}/></div><div className="page-footer"><span>EARTH POWER — DIGITAL STUDIO</span><span>0{index + 1} / 0{sections.length}</span></div></div>
        <div className="book-spine" aria-hidden="true"/>
        <div aria-hidden="true" className={'flipping-sheet' + (turning ? ' flip' : '')}><div className="sheet-front"/><div className="sheet-back"/></div>
      </div>
      <div className="page-arrows"><button onClick={() => shift(-1)} aria-label="Previous page">←</button><span>TURN THE PAGE</span><button onClick={() => shift(1)} aria-label="Next page">→</button></div>
    </section>
    <nav className="bottom-menu" aria-label="Main navigation"><span className="menu-identity"><b>e.</b><span>THE WORKSPACE</span></span><div className="menu-links">{sections.map((s, i) => <button key={s.id} aria-current={current === s.id ? 'page' : undefined} className={current === s.id ? 'active' : ''} onClick={() => navigate(s.id)}><small>0{i + 1}</small><span>{s.label}</span></button>)}</div><span className="menu-end">EXPLORE &nbsp; ✳</span></nav>
  </div>
}
