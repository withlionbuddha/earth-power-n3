import { useState } from 'react'
import { previewStudioReply } from '../services/studioService'
export default function StudioPage() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<{ role: 'me' | 'ai'; text: string }[]>([{ role: 'ai', text: 'Welcome to the studio. What would you like to explore?' }])
return <>
    <div className="page-overline"><span>AN OPEN CANVAS</span><span className="quiet-status">DEMO MODE</span></div>
    <h2 className="section-title">Start with<br/><em>a question.</em></h2><p className="section-subtitle">A simple conversation space for your next experiment.</p>
    <div className="chat">
      <div className="chat-head"><span className="chat-avatar">✳</span><strong>Studio Assistant</strong><span className="quiet-status">● Preview</span></div>
      <div className="chat-body" aria-live="polite">{chat.map((item, i) => <p key={i} className={'bubble ' + item.role}>{item.text}</p>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); if (!message.trim()) return; setChat(c => [...c, { role: 'me', text: message.trim() }, { role: 'ai', text: previewStudioReply() }]); setMessage('') }}>
        <input aria-label="Your message" placeholder="Ask something interesting..." value={message} onChange={e => setMessage(e.target.value)}/><button type="submit" aria-label="Send message">↗</button>
      </form>
    </div>
  </>

}
