import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { user, requests, notifications } = useApp();
  const navigate = useNavigate();
  const recent = requests.slice(0, 3);
  const solved = requests.filter(r => r.status === 'Solved').length;
  const open = requests.filter(r => r.status === 'Open').length;

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/create-request', label: 'Create Request' },
        { to: '/ai-center', label: 'AI Center' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">DASHBOARD</div>
          <h1 className="hero-title">Welcome back, {user?.name?.split(' ')[0] || 'Friend'}.</h1>
          <p className="hero-subtitle">Track your impact, discover help requests, and keep the community moving.</p>
        </div>

        {/* Stats */}
        <div className="grid-3 section-gap fade-up fade-up-1">
          <div className="stat-card">
            <div className="stat-label">YOUR TRUST SCORE</div>
            <div className="stat-value">{user?.trustScore || 80}%</div>
            <div className="stat-desc">Based on contributions and feedback</div>
            <div className="trust-bar mt-8"><div className="trust-fill" style={{ width: `${user?.trustScore || 80}%` }}></div></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">CONTRIBUTIONS</div>
            <div className="stat-value">{user?.contributions || 0}</div>
            <div className="stat-desc">Requests helped and solved</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">ACTIVE REQUESTS</div>
            <div className="stat-value">{open}</div>
            <div className="stat-desc">{solved} requests already solved</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card section-gap fade-up fade-up-1">
          <div className="card-label">QUICK ACTIONS</div>
          <div className="flex gap-12 flex-wrap">
            <button className="btn btn-primary" onClick={() => navigate('/create-request')}>+ Post a request</button>
            <button className="btn btn-dark" onClick={() => navigate('/explore')}>Browse requests</button>
            <button className="btn btn-outline" onClick={() => navigate('/ai-center')}>✦ AI Center</button>
            <button className="btn btn-outline" onClick={() => navigate('/leaderboard')}>🏆 Leaderboard</button>
          </div>
        </div>

        <div className="grid-2 section-gap fade-up fade-up-2">
          {/* Recent */}
          <div>
            <div className="flex-between mb-16">
              <div className="card-label" style={{ margin: 0 }}>RECENT REQUESTS</div>
              <Link to="/explore" style={{ fontSize: 13, color: 'var(--teal)', textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recent.map(r => <RequestCard key={r.id} req={r} />)}
            </div>
          </div>

          {/* AI Insights + Notifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div className="card-label">AI INSIGHTS</div>
              <h3 className="card-title">Platform intelligence</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>TREND PULSE</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>Web Development</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Most common support area based on active community requests.</div>
                </div>
                <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ea580c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>URGENCY WATCH</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>2</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Requests currently flagged high priority.</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-label">RECENT NOTIFICATIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.slice(0, 4).map(n => (
                  <div key={n.id} className="notif-item" style={{ padding: '12px 0' }}>
                    <div>
                      <div className="notif-title" style={{ fontSize: 13 }}>{n.title}</div>
                      <div className="notif-meta">{n.type} • {n.time}</div>
                    </div>
                    <span className={`notif-badge ${n.read ? 'notif-read' : 'notif-unread'}`}>{n.read ? 'Read' : 'Unread'}</span>
                  </div>
                ))}
              </div>
              <Link to="/notifications" style={{ fontSize: 13, color: 'var(--teal)', textDecoration: 'none' }}>View all notifications →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
