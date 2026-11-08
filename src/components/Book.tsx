import type { RefObject } from 'react'
import { subpages } from '../config/navigation'
import type { PageId, ThemeId, Section } from '../types/navigation'
import HomePage from '../pages/HomePage'
import StudioPage from '../pages/StudioPage'
import LibraryPage from '../pages/LibraryPage'
import InsightsPage from '../pages/InsightsPage'
import SettingsPage from '../pages/SettingsPage'
export default function Book({ current, visible, subpage, turning, index, page, navigate, shift, theme, changeTheme, overviewRef }: { current: PageId; visible: PageId; subpage: number; turning: boolean; index: number; page: Section; navigate: (id: PageId) => void; shift: (n: number) => void; theme: ThemeId; changeTheme: (t: ThemeId) => void; overviewRef: RefObject<HTMLSpanElement | null> }) {
  const interior = () => {
    switch (visible) {
      case 'home': return <HomePage navigate={navigate}/>
      case 'studio': return <StudioPage/>
      case 'library': return <LibraryPage/>
      case 'insights': return <InsightsPage/>
      case 'settings': return <SettingsPage theme={theme} onThemeChange={changeTheme}/>
    }
  }
  return <>
    <section className="book-zone screen-panel" aria-label="Interactive content pages">
      <div className="book-shadow"/>
      <div className="book">
        <div className="book-cover"><div className="book-topline"><span>THE EARTH POWER JOURNAL</span><span>VOL. 001</span></div><div className="orbit" aria-hidden="true"/><div className="cover-copy"><span>0{index + 1} / {page.label.toUpperCase()}</span><h2>{page.title.split(' ').slice(0, 2).join(' ')}<br/><em>{page.title.split(' ').slice(2).join(' ')}</em></h2><p>{page.subtitle}</p></div><div className="cover-footer"><span>EP / N3</span><span>AN INTERACTIVE NOTEBOOK</span></div></div>
        <div className="book-page"><div className="page-inner" key={visible + '-' + subpage}>{subpage === 0 ? interior() : <div className="subpage-placeholder"><span>0{subpage + 1} / {subpages[visible].length.toString().padStart(2,'0')}</span><h2>{subpages[visible][subpage]}</h2><p>This page is ready for new content.</p></div>}</div><div className="page-footer"><span>EARTH POWER — DIGITAL STUDIO</span><span>0{subpage + 1} / 0{subpages[current].length}</span></div></div>
        <div className="book-spine" aria-hidden="true"/>
        <div aria-hidden="true" className={'flipping-sheet' + (turning ? ' flip' : '')}><div className="sheet-front"/><div className="sheet-back"/></div>
      </div>
      <div className="page-arrows"><button disabled={subpage === 0} onClick={() => shift(-1)} aria-label="Previous subpage">←</button><span ref={overviewRef}>{subpages[current][subpage]} · {subpage + 1}/{subpages[current].length}</span><button disabled={subpage === subpages[current].length - 1} onClick={() => shift(1)} aria-label="Next subpage">→</button></div>
    </section>

  </>
}
