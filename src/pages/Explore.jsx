import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import { useApp } from '../context/AppContext';

export default function Explore() {
  const { requests } = useApp();
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');

  const filtered = requests.filter(r => {
    if (category && r.category !== category) return false;
    if (urgency && r.urgency !== urgency) return false;
    if (location && !r.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (skills && !r.tags?.some(t => t.toLowerCase().includes(skills.toLowerCase()))) return false;
    return true;
  });

  const categories = [...new Set(requests.map(r => r.category))];

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/leaderboard', label: 'Leaderboard' },
        { to: '/notifications', label: 'Notifications' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">EXPLORE / FEED</div>
          <h1 className="hero-title">Browse help requests with filterable community context.</h1>
          <p className="hero-subtitle">Filter by category, urgency, skills, and location to surface the best matches.</p>
        </div>

        <div className="grid-aside-rev fade-up fade-up-1">
          {/* Filters */}
          <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: 80 }}>
            <div className="card-label">FILTERS</div>
            <h2 className="card-title">Refine the feed</h2>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Urgency</label>
              <select className="form-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
                <option value="">All urgency levels</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Skills</label>
              <input className="form-input" placeholder="React, Figma, Git/GitHub" value={skills} onChange={e => setSkills(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-input" placeholder="Karachi, Lahore, Remote" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setCategory(''); setUrgency(''); setSkills(''); setLocation(''); }}>
              Clear filters
            </button>
          </div>

          {/* Results */}
          <div>
            <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--text-light)' }}>{filtered.length} request{filtered.length !== 1 ? 's' : ''} found</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                  <p style={{ color: 'var(--text-light)' }}>No requests match your filters. Try adjusting them.</p>
                </div>
              ) : filtered.map(r => <RequestCard key={r.id} req={r} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
