import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Messages() {
  const { messages, sendMessage, user, INITIAL_USERS } = useApp();
  const [to, setTo] = useState(INITIAL_USERS[1]?.name || '');
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(to, text);
    setText('');
  };

  const otherUsers = INITIAL_USERS.filter(u => u.name !== user?.name);

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/messages', label: 'Messages' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">INTERACTION / MESSAGING</div>
          <h1 className="hero-title">Keep support moving through direct communication.</h1>
          <p className="hero-subtitle">Basic messaging gives helpers and requesters a clear follow-up path once a match happens.</p>
        </div>

        <div className="grid-2 fade-up fade-up-1">
          {/* Conversation */}
          <div className="card">
            <div className="card-label">CONVERSATION STREAM</div>
            <h2 className="card-title">Recent messages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {messages.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-light)' }}>No messages yet. Start a conversation!</p>
              ) : messages.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '16px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{m.from} → {m.to}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.5 }}>{m.text}</div>
                  </div>
                  <div style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: 12, color: 'var(--text-light)', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>{m.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Send */}
          <div className="card">
            <div className="card-label">SEND MESSAGE</div>
            <h2 className="card-title-lg">Start a conversation</h2>
            <div className="form-group">
              <label className="form-label">To</label>
              <select className="form-select" value={to} onChange={e => setTo(e.target.value)}>
                {INITIAL_USERS.filter(u => u.name !== user?.name).map(u => <option key={u.name}>{u.name}</option>)}
                {user && <option>{user.name}</option>}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Share support details, ask for files, or suggest next steps." value={text} onChange={e => setText(e.target.value)} style={{ minHeight: 160 }} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
