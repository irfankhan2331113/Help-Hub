import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function CreateRequest() {
  const { addRequest, user } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', tags: '', category: 'Web Development', urgency: 'High' });
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAiSuggestions = async () => {
    if (!form.title && !form.description) return;
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Analyze this help request and provide smart suggestions. Title: "${form.title}". Description: "${form.description}".
            
Return ONLY valid JSON with these keys:
- "suggestedCategory": one of "Web Development", "Design", "Career", "Data", "Community"
- "detectedUrgency": one of "High", "Medium", "Low"  
- "suggestedTags": array of 3-5 relevant tags
- "rewriteSuggestion": a 1-sentence improved version of the description
No markdown, pure JSON only.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      setAiResult(JSON.parse(clean));
    } catch (e) {
      setAiResult({
        suggestedCategory: 'Web Development',
        detectedUrgency: 'Medium',
        suggestedTags: ['JavaScript', 'Help Needed', 'Review'],
        rewriteSuggestion: 'Start describing the challenge to generate a stronger version.'
      });
    }
    setLoading(false);
  };

  const applyAI = () => {
    if (!aiResult) return;
    setForm(f => ({
      ...f,
      category: aiResult.suggestedCategory || f.category,
      urgency: aiResult.detectedUrgency || f.urgency,
      tags: aiResult.suggestedTags?.join(', ') || f.tags
    }));
  };

  const handlePublish = () => {
    if (!form.title) return;
    addRequest({ ...form, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean) });
    navigate('/explore');
  };

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/create-request', label: 'Create Request' },
      ]} />
      <div className="page-wrap">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">CREATE REQUEST</div>
          <h1 className="hero-title">Turn a rough problem into a clear help request.</h1>
          <p className="hero-subtitle">Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.</p>
        </div>

        <div className="grid-aside fade-up fade-up-1">
          {/* Form */}
          <div className="card">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" placeholder="Need review on my JavaScript quiz app before submission" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} onBlur={getAiSuggestions} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} onBlur={getAiSuggestions} />
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Tags</label>
                <input className="form-input" placeholder="JavaScript, Debugging, Review" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>Web Development</option>
                  <option>Design</option>
                  <option>Career</option>
                  <option>Data</option>
                  <option>Community</option>
                </select>
              </div>
            </div>
            <div className="form-group mt-12">
              <label className="form-label">Urgency</label>
              <select className="form-select" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex gap-12 mt-16">
              <button className="btn btn-outline" onClick={applyAI} disabled={!aiResult}>Apply AI suggestions</button>
              <button className="btn btn-primary" onClick={handlePublish} disabled={!form.title}>Publish request</button>
            </div>
          </div>

          {/* AI Panel */}
          <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: 80 }}>
            <div className="card-label">AI ASSISTANT</div>
            <h2 className="card-title-lg">Smart request guidance</h2>
            {loading && <div style={{ color: 'var(--text-light)', fontSize: 14 }}>✦ Analyzing your request...</div>}
            {!aiResult && !loading && (
              <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Start typing your title and description to get AI-powered suggestions.</div>
            )}
            {aiResult && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['Suggested category', aiResult.suggestedCategory],
                  ['Detected urgency', aiResult.detectedUrgency],
                  ['Suggested tags', aiResult.suggestedTags?.join(', ')],
                  ['Rewrite suggestion', aiResult.rewriteSuggestion]
                ].map(([k, v]) => (
                  <div key={k} className="flex-between" style={{ fontSize: 14, borderBottom: '1px solid var(--gray-100)', paddingBottom: 12, gap: 12 }}>
                    <span style={{ color: 'var(--text-light)', minWidth: 120 }}>{k}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right', color: 'var(--text-dark)' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
