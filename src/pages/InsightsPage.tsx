export default function InsightsPage() {
return <>
    <div className="page-overline"><span>YOUR WORK, IN PERSPECTIVE</span><span className="quiet-status">SAMPLE DATA</span></div>
    <h2 className="section-title">Notice the<br/><em>small patterns.</em></h2><p className="section-subtitle">A snapshot of ideas and activity, at a glance.</p>
    <div className="metric-grid"><div><small>PROJECTS</small><strong>08</strong><span>Current workspace</span></div><div><small>EXPLORATIONS</small><strong>24</strong><span>Ideas in progress</span></div><div><small>COLLECTIONS</small><strong>06</strong><span>Useful references</span></div></div>
    <div className="chart"><div className="chart-top"><strong>Creative momentum</strong><small>LAST 7 DAYS</small></div><div className="bars">{[49,72,61,89,64,95,77].map((v, i) => <div key={i}><span style={{ height: v + '%' }}/><small>{['M','T','W','T','F','S','S'][i]}</small></div>)}</div></div>
  </>

}
