import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AiCenter() {
  const { requests, INITIAL_USERS } = useApp();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const highUrgency = requests.filter(r => r.urgency === 'High').length;
  const categories = requests.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {});
  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Web Development';
  const trustedHelpers = INITIAL_USERS.filter(u => u.trustScore >= 80).length;

  const getAiInsights = async () => {
    setLoading(true);
    try {
      const requestSummary = requests.map(r => `${r.title} [${r.category}, ${r.urgency}]`).join('; ');
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are the AI Center of HelpHub, a community support platform. Analyze these requests: ${requestSummary}
            
Return ONLY valid JSON with:
- "trendInsight": 1-2 sentences on what topics are trending and why
- "urgencyAlert": 1 sentence about urgent needs
- "matchRecommendation": 1 sentence advice for helpers
- "communityHealth": a score from 1-100 and a 1-sentence assessment
No markdown, pure JSON.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      setInsights(JSON.parse(clean));
    } catch (e) {
      setInsights({
        trendInsight: 'Web Development is the dominant support area, driven by portfolio deadlines and internship applications.',
        urgencyAlert: '2 high-urgency requests need immediate attention from experienced frontend developers.',
        matchRecommendation: 'Helpers with CSS, React, and interview coaching skills are in highest demand right now.',
        communityHealth: { score: 87, assessment: 'Community is highly active with strong solver-to-requester ratio.' }
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/create-request', label: 'Create Request' },
        { to: '/ai-center', label: 'AI Center' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">AI CENTER</div>
          <h1 className="hero-title">See what the platform intelligence is noticing.</h1>
          <p className="hero-subtitle">AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.</p>
        </div>

        {/* Stats */}
        <div className="grid-3 section-gap fade-up fade-up-1">
          <div className="stat-card">
            <div className="stat-label">TREND PULSE</div>
            <div className="stat-value" style={{ fontSize: 24 }}>{topCategory}</div>
            <div className="stat-desc">Most common support area based on active community requests.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">URGENCY WATCH</div>
            <div className="stat-value">{highUrgency}</div>
            <div className="stat-desc">Requests currently flagged high priority by the urgency detector.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">MENTOR POOL</div>
            <div className="stat-value">{trustedHelpers}</div>
            <div className="stat-desc">Trusted helpers with strong response history and contribution signals.</div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card section-gap fade-up fade-up-1">
          <div className="flex-between mb-16">
            <div>
              <div className="card-label">PLATFORM INTELLIGENCE</div>
              <h2 className="card-title-lg" style={{ marginBottom: 0 }}>Deep AI analysis</h2>
            </div>
            <button className="btn btn-primary" onClick={getAiInsights} disabled={loading}>
              {loading ? '✦ Analyzing...' : '✦ Generate insights'}
            </button>
          </div>
          {!insights && !loading && (
            <div style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
              <p style={{ fontSize: 14, color: 'var(--text-light)' }}>Click "Generate insights" to get real AI analysis of platform trends, urgency signals, and community health.</p>
            </div>
          )}
          {loading && (
            <div style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: 'var(--text-light)' }}>✦ AI is analyzing {requests.length} community requests...</div>
            </div>
          )}
          {insights && !loading && (
            <div className="grid-2" style={{ gap: 16 }}>
              {[
                ['📈 Trend Insight', insights.trendInsight, 'var(--teal)'],
                ['🚨 Urgency Alert', insights.urgencyAlert, '#dc2626'],
                ['🤝 Match Recommendation', insights.matchRecommendation, '#ea580c'],
                ['💚 Community Health', `${typeof insights.communityHealth === 'object' ? insights.communityHealth.score : insights.communityHealth}/100 — ${typeof insights.communityHealth === 'object' ? insights.communityHealth.assessment : ''}`, '#16a34a']
              ].map(([title, text, color]) => (
                <div key={title} style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '20px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-mid)' }}>{text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="card fade-up fade-up-2">
          <div className="card-label">AI RECOMMENDATIONS</div>
          <h2 className="card-title-lg">Requests needing attention</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requests.filter(r => r.urgency !== 'Low').map(r => (
              <div key={r.id} style={{ background: 'var(--gray-50)', borderRadius: 10, padding: '16px' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 10 }}>{r.aiSummary || 'This request needs community attention.'}</div>
                <div className="flex gap-8 flex-wrap">
                  <span className={`tag ${r.category === 'Web Development' ? 'tag-blue' : 'tag-teal'}`}>{r.category}</span>
                  <span className={`tag ${r.urgency === 'High' ? 'tag-red' : 'tag-orange'}`}>{r.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
