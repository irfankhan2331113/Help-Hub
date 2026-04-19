import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const urgencyClass = { High: 'tag-red', Medium: 'tag-orange', Low: 'tag-blue' };
const statusClass = { Solved: 'tag-green', Open: 'tag-teal' };

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requests, markSolved, iCanHelp, user } = useApp();
  const req = requests.find(r => r.id === parseInt(id) || r.id === id);

  if (!req) return (
    <div>
      <Navbar links={[{ to: '/explore', label: '← Back to Explore' }]} />
      <div className="page-wrap" style={{ textAlign: 'center', paddingTop: 80 }}>
        <h2>Request not found.</h2>
        <button className="btn btn-primary mt-16" onClick={() => navigate('/explore')}>Back to Explore</button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/messages', label: 'Messages' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">REQUEST DETAIL</div>
          <div className="hero-tags">
            <span className={`tag ${req.category === 'Web Development' ? 'tag-blue' : req.category === 'Design' ? 'tag-orange' : 'tag-teal'}`} style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>{req.category}</span>
            <span className={`tag ${urgencyClass[req.urgency]}`} style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>{req.urgency}</span>
            <span className={`tag ${statusClass[req.status]}`} style={{ color: 'rgba(255,255,255,0.9)', background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.4)' }}>{req.status}</span>
          </div>
          <h1 className="hero-title">{req.title}</h1>
          <p className="hero-subtitle">{req.description}</p>
        </div>

        <div className="grid-aside fade-up fade-up-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* AI Summary */}
            <div className="card">
              <div className="card-label">AI SUMMARY</div>
              <div className="flex-center gap-12 mb-12">
                <div className="avatar avatar-teal"><span>H</span></div>
                <span style={{ fontWeight: 600 }}>HelpHub AI</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-mid)', marginBottom: 16 }}>{req.aiSummary || 'AI is analyzing this request to surface the most relevant helpers and context.'}</p>
              {req.tags && <div className="flex flex-wrap gap-8">{req.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
            </div>

            {/* Actions */}
            <div className="card">
              <div className="card-label">ACTIONS</div>
              <div className="flex gap-12 flex-wrap">
                {req.status !== 'Solved' && (
                  <button className="btn btn-primary" onClick={() => iCanHelp(req.id)}>I can help</button>
                )}
                {req.status !== 'Solved' && (
                  <button className="btn btn-outline" onClick={() => markSolved(req.id)}>Mark as solved</button>
                )}
                {req.status === 'Solved' && (
                  <div style={{ fontSize: 14, color: 'var(--teal)', fontWeight: 600 }}>✓ This request has been solved</div>
                )}
                <button className="btn btn-outline" onClick={() => navigate('/messages')}>Send message</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Requester */}
            <div className="card">
              <div className="card-label">REQUESTER</div>
              <div className="flex-center gap-12">
                <div className="avatar avatar-orange avatar-lg">{req.author?.split(' ').map(w => w[0]).join('')}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{req.author}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{req.location}</div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex gap-12" style={{ fontSize: 13 }}>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/explore')}>Explore</button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/messages')}>Messages</button>
              </div>
            </div>

            {/* Helpers */}
            <div className="card">
              <div className="card-label">HELPERS</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>People ready to support</h3>
              {(!req.helpersList || req.helpersList.length === 0) ? (
                <p style={{ fontSize: 13, color: 'var(--text-light)' }}>No helpers yet. Be the first to offer support!</p>
              ) : req.helpersList.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < req.helpersList.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <div className={`avatar avatar-${h.color || 'teal'} avatar-lg`}>{h.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{h.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{h.skills}</div>
                  </div>
                  <div style={{ background: h.trust === 100 ? 'rgba(13,148,136,0.1)' : 'var(--gray-100)', color: h.trust === 100 ? 'var(--teal)' : 'var(--text-mid)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600 }}>Trust {h.trust}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
