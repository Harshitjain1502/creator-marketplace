import React from 'react';
import { useUser } from '../context/UserContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { currentUser, toggleRole } = useUser();

  const navButtonStyle = (tabName) => ({
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: activeTab === tabName ? '#2563eb' : 'transparent',
    color: activeTab === tabName ? '#ffffff' : '#334155',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  });

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('browse')} 
        style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}
      >
        CreatorGigs
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={navButtonStyle('browse')} onClick={() => setActiveTab('browse')}>
          Browse
        </button>
        <button style={navButtonStyle('post')} onClick={() => setActiveTab('post')}>
          Post a Gig
        </button>
        <button style={navButtonStyle('dashboard')} onClick={() => setActiveTab('dashboard')}>
          Creator Dashboard
        </button>
        <button style={navButtonStyle('bookings')} onClick={() => setActiveTab('bookings')}>
          My Bookings
        </button>
      </div>

      {/* Persona Role Switcher (No-Auth) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Role: <strong style={{ color: '#0f172a' }}>{currentUser.name}</strong>
        </span>
        <button
          onClick={toggleRole}
          style={{
            padding: '0.4rem 0.8rem',
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Switch Persona
        </button>
      </div>
    </nav>
  );
}