import React from 'react';
import { useNavigate } from 'react-router-dom';

const urgencyClass = { High: 'tag-red', Medium: 'tag-orange', Low: 'tag-blue' };
const statusClass = { Solved: 'tag-green', Open: 'tag-teal' };

export default function RequestCard({ req }) {
  const navigate = useNavigate();
  return (
    <div className="request-card" onClick={() => navigate(`/request/${req.id}`)}>
      <div className="request-card-tags">
        <span className={`tag ${req.category === 'Web Development' ? 'tag-blue' : req.category === 'Design' ? 'tag-orange' : 'tag-teal'}`}>{req.category}</span>
        <span className={`tag ${urgencyClass[req.urgency] || ''}`}>{req.urgency}</span>
        <span className={`tag ${statusClass[req.status] || ''}`}>{req.status}</span>
      </div>
      <div className="request-card-title">{req.title}</div>
      <div className="request-card-desc">{req.description}</div>
      {req.tags && <div className="flex flex-wrap gap-8 mb-8">{req.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
      <div className="request-card-footer">
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{req.author}</div>
          <div className="request-card-meta">{req.location} • {req.helpers} helper{req.helpers !== 1 ? 's' : ''} interested</div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={e => { e.stopPropagation(); navigate(`/request/${req.id}`); }}>Open details</button>
      </div>
    </div>
  );
}
