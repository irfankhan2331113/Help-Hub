import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const DEMO_USERS = ['Irfan Khan', 'Kamran khan', 'Imran khan'];

export default function Auth() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('Irfan Khan');
  const [role, setRole] = useState('Both');
  const [email] = useState('community@helphub.ai');

  const handleSubmit = () => {
    const initials = name.split(' ').map(w => w[0]).join('');
    const colors = { 'Irfan Khan': 'orange', 'Kamran khan': 'dark', 'Imran khan': 'purple' };
    login({ name, initials, role, color: colors[name] || 'teal' });
    navigate('/onboarding');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">H</div>
          <span className="nav-brand-name">HelpHub AI</span>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/explore" className="nav-link">Explore</a>
          <a href="/leaderboard" className="nav-link">Leaderboard</a>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div className="grid-2" style={{ maxWidth: 900, width: '100%', gap: 24 }}>
          {/* Left */}
          <div style={{ background: 'var(--dark)', borderRadius: 20, padding: '40px 36px', color: 'white' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>COMMUNITY ACCESS</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>Enter the support network.</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28 }}>Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.</p>
            <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Role-based entry for Need Help, Can Help, or Both', 'Direct path into dashboard, requests, AI Center, and community feed', 'Persistent demo session powered by LocalStorage'].map(i => (
                <li key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{i}</li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="card">
            <div className="card-label">LOGIN / SIGNUP</div>
            <h2 className="card-title-lg">Authenticate your community profile</h2>

            <div className="form-group">
              <label className="form-label">Select demo user</label>
              <select className="form-select" value={name} onChange={e => setName(e.target.value)}>
                {DEMO_USERS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Role selection</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                <option>Need Help</option>
                <option>Can Help</option>
                <option>Both</option>
              </select>
            </div>

            <div className="grid-2" style={{ gap: 12, marginBottom: 18 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email</label>
                <input className="form-input" value={email} readOnly />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Password</label>
                <input className="form-input" type="password" value="••••••••" readOnly />
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={handleSubmit}>
              Continue to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
