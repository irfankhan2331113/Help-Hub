import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar({ links = [] }) {
  const { user, logout, unreadCount } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <div className="nav-logo">H</div>
        <span className="nav-brand-name">HelpHub AI</span>
      </NavLink>
      <div className="nav-links">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {l.label}
            {l.label === 'Notifications' && unreadCount > 0 && (
              <span style={{ marginLeft: 5, background: '#ef4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{unreadCount}</span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="flex-center gap-8">
        {user ? (
          <>
            <div className={`avatar avatar-${user.color || 'teal'}`} title={user.name}>{user.initials || user.name?.[0]}</div>
            <button className="btn btn-outline btn-sm" onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        ) : (
          <NavLink to="/auth" className="nav-btn teal">Join the platform</NavLink>
        )}
      </div>
    </nav>
  );
}
