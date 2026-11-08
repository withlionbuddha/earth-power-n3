import type { PageId } from '../types/navigation'
export default function TopBar({ navigate, goScreen }: { navigate: (id: PageId) => void; goScreen: (n: number) => void }) {
  return <section className="top-zone"><header className="topbar"><a className="brand" href="#home" onClick={e => { e.preventDefault(); navigate('home'); goScreen(0) }}><span className="brand-circle">e<span>.</span></span><strong>earth power <i>/ n3</i></strong></a><span className="topbar-center">A DIGITAL THINKING SPACE &nbsp; ✳</span><span className="topbar-end"><span className="status-dot"/> EXPLORATION MODE</span></header></section>
}
