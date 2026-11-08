import { useState } from 'react'
import { sampleFiles } from '../services/api'
export default function LibraryPage() {
  const [search, setSearch] = useState('')
return <>
    <div className="page-overline"><span>YOUR COLLECTION</span><span className="quiet-status">SAMPLE CONTENT</span></div>
    <h2 className="section-title">Everything worth<br/><em>keeping.</em></h2><p className="section-subtitle">Notes, documents and references—together at last.</p>
    <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} aria-label="Search the library" placeholder="Search the collection"/></label>
    <div className="file-list">{sampleFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map((f, i) => <div className="file-row" key={f.name}><small>0{i + 1}</small><span className="file-icon">▤</span><span className="file-main"><strong>{f.name}</strong><span>{f.desc}</span></span><small className="file-type">{f.type}</small><span>↗</span></div>)}</div>
  </>

}
