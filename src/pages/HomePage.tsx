import type { PageId } from '../types/navigation'
export default function HomePage({ navigate }: { navigate: (p: PageId) => void }) {
return <>
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

}
