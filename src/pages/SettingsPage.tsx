import type { PageId, ThemeId } from '../types/navigation'
import { themes } from '../config/themes'
export default function SettingsPage({ theme, onThemeChange }: { theme: ThemeId; onThemeChange: (t: ThemeId) => void }) {
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
