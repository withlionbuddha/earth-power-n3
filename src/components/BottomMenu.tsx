import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '../services/authService'
import { sections } from '../config/navigation'
import type { PageId } from '../types/navigation'
export default function BottomMenu({ current, navigate, goScreen, overviewRef }: { current: PageId; navigate: (id: PageId) => void; goScreen: (n: number) => void; overviewRef: import('react').RefObject<HTMLSpanElement | null> }) {
  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginStage, setLoginStage] = useState<'id' | 'password' | 'authenticated'>('id')
  const [loginBusy, setLoginBusy] = useState(false)
  const [loginNotice, setLoginNotice] = useState('')
  const loginInputRef = useRef<HTMLInputElement>(null)
  const dockRef = useRef<HTMLElement>(null)
  const overviewRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const alignHome = () => {
      const dock = dockRef.current
      const overview = overviewRef.current
      if (!dock || !overview) return
      const offset = overview.getBoundingClientRect().left - dock.getBoundingClientRect().left
      dock.style.setProperty('--home-start', offset + 'px')
    }
    alignHome()
    const observer = new ResizeObserver(alignHome)
    if (dockRef.current) observer.observe(dockRef.current)
    if (overviewRef.current) observer.observe(overviewRef.current)
    window.addEventListener('resize', alignHome)
    return () => { observer.disconnect(); window.removeEventListener('resize', alignHome) }
  }, [])

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loginBusy || loginStage === 'authenticated') return
    setLoginNotice('')
    if (loginStage === 'id') {
      if (!loginId.trim()) { setLoginNotice('Please enter your ID.'); return }
      setLoginStage('password')
      window.setTimeout(() => loginInputRef.current?.focus(), 0)
      return
    }
    if (!loginPassword) { setLoginNotice('Please enter your password.'); return }
    setLoginBusy(true)
    try {
      await login({ username: loginId.trim(), password: loginPassword })
      setLoginStage('authenticated')
      setLoginNotice('Signed in.')
    } catch {
      setLoginNotice('Login failed. Check your credentials or server connection.')
      setLoginPassword('')
      loginInputRef.current?.focus()
    } finally {
      setLoginBusy(false)
      setLoginPassword('')
    }
  }

  return <>
    <nav ref={dockRef} className="bottom-menu" aria-label="Main navigation"><div className="menu-login"><span className="menu-mark" aria-label="Earth Power">e.</span><form className="login-form" onSubmit={submitLogin}><div className="login-field"><input ref={loginInputRef} aria-label={loginStage === 'password' ? 'Password' : 'Login ID'} autoComplete={loginStage === 'password' ? 'current-password' : 'username'} type={loginStage === 'password' ? 'password' : 'text'} placeholder={loginStage === 'password' ? 'Password' : loginStage === 'authenticated' ? loginId : 'Login ID'} value={loginStage === 'password' ? loginPassword : loginStage === 'authenticated' ? '' : loginId} onFocus={() => setLoginNotice('')} onChange={event => { if (loginStage === 'password') setLoginPassword(event.target.value); else setLoginId(event.target.value); setLoginNotice('') }} disabled={loginBusy || loginStage === 'authenticated'}/>{loginNotice && <span className="login-notice" role="status" onClick={() => { setLoginNotice(''); loginInputRef.current?.focus() }}>{loginNotice}</span>}</div><button type="submit" disabled={loginBusy || loginStage === 'authenticated'} aria-label={loginStage === 'id' ? 'Continue to password' : 'Sign in'} title={loginStage === 'id' ? 'Next' : 'Sign in'}>↵</button></form></div><div className="menu-links">{sections.map((s, i) => <button key={s.id} aria-current={current === s.id ? 'page' : undefined} className={current === s.id ? 'active' : ''} onClick={() => { navigate(s.id); goScreen(i) }}><small>0{i + 1}</small><span>{s.label}</span></button>)}</div><span className="menu-end">EXPLORE &nbsp; ✳</span></nav>
  </>
}
