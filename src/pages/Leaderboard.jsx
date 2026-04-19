import React from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Leaderboard() {
  const { INITIAL_USERS } = useApp();
  const sorted = [...INITIAL_USERS].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/leaderboard', label: 'Leaderboard' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">LEADERBOARD</div>
          <h1 className="hero-title">Recognize the people who keep the community moving.</h1>
          <p className="hero-subtitle">Trust score, contribution count, and badges create visible momentum for reliable helpers.</p>
        </div>

        <div className="grid-2 fade-up fade-up-1">
          {/* Rankings */}
          <div className="card">
            <div className="card-label">TOP HELPERS</div>
            <h2 className="card-title-lg">Rankings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {sorted.map((u, i) => (
                <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', borderBottom: i < sorted.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <div className={`avatar avatar-${u.color} avatar-lg`}>{u.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>#{i + 1} {u.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{u.skills.join(', ')}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{u.trustScore}%</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{u.contributions} contributions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge System */}
          <div className="card">
            <div className="card-label">BADGE SYSTEM</div>
            <h2 className="card-title-lg">Trust and achievement</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sorted.map((u) => (
                <div key={u.name} style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '16px' }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{u.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>{u.badges.join(' • ')}</div>
                  <div className="trust-bar"><div className="trust-fill" style={{ width: `${u.trustScore}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-3 mt-24 fade-up fade-up-2">
          <div className="stat-card">
            <div className="stat-label">TOP TRUST SCORE</div>
            <div className="stat-value">100%</div>
            <div className="stat-desc">Ayesha Khan — Design Ally, Fast Responder, Top Mentor</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">TOTAL CONTRIBUTIONS</div>
            <div className="stat-value">{INITIAL_USERS.reduce((a, u) => a + u.contributions, 0)}</div>
            <div className="stat-desc">Across all community helpers</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">ACTIVE HELPERS</div>
            <div className="stat-value">{INITIAL_USERS.length}</div>
            <div className="stat-desc">Community members contributing</div>
          </div>
        </div>
      </div>
    </div>
  );
}
