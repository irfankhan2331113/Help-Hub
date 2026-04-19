import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { user, login } = useApp();
  const [form, setForm] = useState({
    name: user?.name || '',
    location: user?.location || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : (user?.skills || ''),
    interests: user?.interests || ''
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    login({
      ...user,
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const skills = Array.isArray(user?.skills) ? user.skills : (user?.skills?.split(',').map(s => s.trim()) || []);

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/onboarding', label: 'Onboarding' },
        { to: '/profile', label: 'Profile' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">PROFILE</div>
          <h1 className="hero-title">{user?.name || 'Your Profile'}</h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>{user?.role || 'Both'} • {user?.location || 'Community'}</p>
        </div>

        <div className="grid-2 fade-up fade-up-1">
          {/* Public Profile */}
          <div className="card">
            <div className="card-label">PUBLIC PROFILE</div>
            <h2 className="card-title-lg">Skills and reputation</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Trust score', `${user?.trustScore || 80}%`],
                ['Contributions', user?.contributions || 0],
              ].map(([k, v]) => (
                <div key={k} className="flex-between" style={{ padding: '14px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <span style={{ fontSize: 14 }}>{k}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="mb-16">
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Skills</div>
              <div className="flex flex-wrap gap-8">
                {skills.length > 0 ? skills.map(s => <span key={s} className="tag tag-teal">{s}</span>) : <span style={{ fontSize: 13, color: 'var(--text-light)' }}>No skills added yet</span>}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Badges</div>
              <div className="flex flex-wrap gap-8">
                {(user?.badges || []).length > 0
                  ? (user.badges).map(b => <span key={b} className="tag">{b}</span>)
                  : <span style={{ fontSize: 13, color: 'var(--text-light)' }}>No badges yet — start contributing!</span>
                }
              </div>
            </div>

            <div className="divider"></div>

            <div className="trust-bar" style={{ height: 8 }}>
              <div className="trust-fill" style={{ width: `${user?.trustScore || 80}%` }}></div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 6 }}>Trust score: {user?.trustScore || 80}%</div>
          </div>

          {/* Edit Profile */}
          <div className="card">
            <div className="card-label">EDIT PROFILE</div>
            <h2 className="card-title-lg">Update your identity</h2>

            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Skills</label>
              <input className="form-input" placeholder="Figma, UI/UX, HTML/CSS, Career Guidance" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Interests</label>
              <input className="form-input" placeholder="Hackathons, UI/UX, Community Building" value={form.interests} onChange={e => setForm({ ...form, interests: e.target.value })} />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: 14 }}
              onClick={handleSave}
            >
              {saved ? '✓ Profile saved!' : 'Save profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
