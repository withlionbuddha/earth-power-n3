import { useRef } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import BottomMenu from './components/BottomMenu'
import Book from './components/Book'
import { useTheme } from './hooks/useTheme'
import { useBookNavigation } from './hooks/useBookNavigation'
export default function App() {
  const { theme, changeTheme } = useTheme()
  const { current, visible, subpage, screen, turning, index, page, navigate, shift, goScreen } = useBookNavigation()
  const overviewRef = useRef<HTMLSpanElement>(null)
  return <div className="app-shell" data-theme={theme}>
    <div className="ambient-ring" aria-hidden="true"/>
    <TopBar navigate={navigate} goScreen={goScreen}/>
    <div className="screen-stack" style={{ transform: `translateY(-${screen * 20}%)` }}>
      <Book current={current} visible={visible} subpage={subpage} turning={turning} index={index} page={page} navigate={navigate} shift={shift} theme={theme} changeTheme={changeTheme} overviewRef={overviewRef}/>
      {Array.from({ length: 4 }, (_, i) => <section key={i} className="empty-screen screen-panel" aria-label={`Empty full screen ${i + 1}`}><span className="empty-screen-label">CANVAS 0{i + 2}</span></section>)}
    </div>
    <BottomMenu current={current} navigate={navigate} goScreen={goScreen} overviewRef={overviewRef}/>
  </div>
}
