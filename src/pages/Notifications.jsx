import React from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Notifications() {
  const { notifications, setNotifications } = useApp();

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div>
      <Navbar links={[
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/explore', label: 'Explore' },
        { to: '/notifications', label: 'Notifications' },
      ]} />
      <div className="page-wrap-sm">
        <div className="hero-banner fade-up">
          <div className="hero-eyebrow">NOTIFICATIONS</div>
          <h1 className="hero-title">Stay updated on requests, helpers, and trust signals.</h1>
        </div>

        <div className="card fade-up fade-up-1">
          <div className="flex-between mb-16">
            <div className="card-label" style={{ margin: 0 }}>LIVE UPDATES</div>
            <button className="btn btn-outline btn-sm" onClick={markAllRead}>Mark all read</button>
          </div>
          <h2 className="card-title">Notification feed</h2>
          <div>
            {notifications.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-light)', padding: '24px 0' }}>No notifications yet.</p>
            )}
            {notifications.map(n => (
              <div key={n.id} className="notif-item">
                <div>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-meta">{n.type} • {n.time}</div>
                </div>
                <span className={`notif-badge ${n.read ? 'notif-read' : 'notif-unread'}`}>
                  {n.read ? 'Read' : 'Unread'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
