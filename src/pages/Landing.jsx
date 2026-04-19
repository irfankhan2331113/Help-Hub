import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import { useApp } from '../context/AppContext';

export default function Landing() {
  const { requests } = useApp();
  const navigate = useNavigate();
  const featured = requests.slice(0, 3);

  return (
    <div>
      <Navbar links={[
        { to: '/', label: 'Home' },
        { to: '/explore', label: 'Explore' },
        { to: '/leaderboard', label: 'Leaderboard' },
        { to: '/ai-center', label: 'AI Center' },
      ]} />
      <div className="page-wrap">

        {/* Hero */}
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">SMIT GRAND CODING NIGHT 2026</div>
          <h1 className="hero-title">Find help faster.<br />Become help that matters.</h1>
          <p className="hero-subtitle" style={{ marginBottom: 28 }}>HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.</p>
          <div className="flex gap-12 flex-wrap">
            <Link to="/auth" className="btn btn-dark">Open product demo</Link>
            <Link to="/auth" className="btn btn-outline" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.3)' }}>Post a request</Link>
          </div>
          <div className="grid-3 mt-24" style={{ marginTop: 40 }}>
            {[['384+', 'MEMBERS', 'Students, mentors, and helpers in the loop.'], ['72+', 'REQUESTS', 'Support posts shared across learning journeys.'], ['69+', 'SOLVED', 'Problems resolved through fast community action.']].map(([v, l, d]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 4 }}>{v}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live signal */}
        <div className="flex-between mb-16 fade-up fade-up-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }}></span>
            <span style={{ fontSize: 13, color: 'var(--text-light)' }}>Live community signals</span>
          </div>
          <Link to="/explore" className="btn btn-outline btn-sm">View full feed →</Link>
        </div>

        {/* Core flow */}
        <div className="card section-gap fade-up fade-up-1">
          <div className="card-label">CORE FLOW</div>
          <div className="flex-between mb-16">
            <h2 className="font-display fw-700" style={{ fontSize: 28 }}>From struggling alone to solving together</h2>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/auth')}>Try onboarding AI</button>
          </div>
          <div className="grid-3">
            {[
              ['Ask for help clearly', 'Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.'],
              ['Discover the right people', 'Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.'],
              ['Track real contribution', 'Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.']
            ].map(([t, d]) => (
              <div key={t} style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '20px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured requests */}
        <div className="section-gap fade-up fade-up-2">
          <div className="card-label" style={{ marginBottom: 8 }}>FEATURED REQUESTS</div>
          <div className="flex-between mb-16">
            <h2 className="font-display fw-700" style={{ fontSize: 24 }}>Community problems currently in motion</h2>
            <Link to="/explore" className="btn btn-outline btn-sm">View full feed</Link>
          </div>
          <div className="grid-3">
            {featured.map(r => <RequestCard key={r.id} req={r} />)}
          </div>
        </div>

        {/* Features */}
        <div className="card section-gap fade-up fade-up-2">
          <div className="card-label">LIVE PRODUCT FEEL</div>
          <div className="grid-2">
            <div>
              <h2 className="font-display fw-700" style={{ fontSize: 30, marginBottom: 12 }}>More than a form.<br />More like an ecosystem.</h2>
              <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['AI request intelligence', 'Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.'],
                ['Community trust graph', 'Badges, helper rankings, trust score boosts, and visible contribution history.'],
                ['100%', 'Top trust score currently active across the sample mentor network.']
              ].map(([t, d]) => (
                <div key={t} style={{ background: 'var(--gray-50)', borderRadius: 10, padding: '16px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)', padding: '24px 0' }}>
          HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
        </p>
      </div>
    </div>
  );
}
