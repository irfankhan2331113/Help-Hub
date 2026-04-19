import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const { user, login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '', location: user?.location || '', skills: user?.skills?.join(', ') || '', interests: user?.interests || ''
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const getAiSuggestions = async () => {
    if (!form.skills && !form.interests) return;
    setAiLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Based on a user with skills: "${form.skills}" and interests: "${form.interests}", provide community platform suggestions. Return ONLY valid JSON with keys: "canHelpWith" (array of 3 skill areas they can help others), "mightNeedHelpWith" (array of 3 areas they might want to learn), "suggestedTags" (array of 5 tags for their profile). No markdown, pure JSON.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      setAiSuggestions(JSON.parse(clean));
    } catch (e) {
      setAiSuggestions({
        canHelpWith: ['UI/UX Design', 'HTML/CSS', 'Career Guidance'],
        mightNeedHelpWith: ['Backend Development', 'Data Analysis', 'Public Speaking'],
        suggestedTags: ['Frontend', 'Design', 'Mentoring', 'Community', 'Career']
      });
    }
    setAiLoading(false);
  };

  const handleSave = () => {
    login({ ...user, ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) });
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar links={[{ to: '/dashboard', label: 'Dashboard' }, { to: '/onboarding', label: 'Onboarding' }, { to: '/profile', label: 'Profile' }]} />
      <div className="page-wrap-sm">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">ONBOARDING</div>
          <h1 className="hero-title">Set up your community identity.</h1>
          <p className="hero-subtitle">Tell us about yourself and let AI suggest where you can help and grow.</p>
        </div>

        <div className="grid-2 fade-up fade-up-1">
          <div className="card">
            <div className="card-label">YOUR PROFILE</div>
            <h2 className="card-title">Tell us about yourself</h2>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-input" placeholder="Karachi, Lahore, Remote..." value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Skills (comma separated)</label>
              <input className="form-input" placeholder="React, Figma, Python..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Interests</label>
              <input className="form-input" placeholder="Hackathons, UI/UX, Open Source..." value={form.interests} onChange={e => setForm({ ...form, interests: e.target.value })} />
            </div>
            <div className="flex gap-12">
              <button className="btn btn-outline" onClick={getAiSuggestions} disabled={aiLoading}>
                {aiLoading ? '⟳ Analyzing...' : '✦ Get AI Suggestions'}
              </button>
              <button className="btn btn-primary" onClick={handleSave}>Save & continue →</button>
            </div>
          </div>

          <div className="card">
            <div className="card-label">AI SUGGESTION</div>
            <h2 className="card-title">Smart profile insights</h2>
            {!aiSuggestions && !aiLoading && (
              <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
                <p style={{ fontSize: 14, color: 'var(--text-light)' }}>Fill in your skills and interests, then click "Get AI Suggestions" to see personalized recommendations.</p>
              </div>
            )}
            {aiLoading && (
              <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, color: 'var(--text-light)' }}>AI is analyzing your profile...</div>
              </div>
            )}
            {aiSuggestions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', marginBottom: 8 }}>YOU CAN HELP WITH</div>
                  <div className="flex flex-wrap gap-8">{aiSuggestions.canHelpWith?.map(s => <span key={s} className="tag tag-teal">{s}</span>)}</div>
                </div>
                <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#ea580c', marginBottom: 8 }}>YOU MIGHT NEED HELP WITH</div>
                  <div className="flex flex-wrap gap-8">{aiSuggestions.mightNeedHelpWith?.map(s => <span key={s} className="tag tag-orange">{s}</span>)}</div>
                </div>
                <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-light)', marginBottom: 8 }}>SUGGESTED TAGS</div>
                  <div className="flex flex-wrap gap-8">{aiSuggestions.suggestedTags?.map(s => <span key={s} className="tag">{s}</span>)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
