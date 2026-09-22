import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { API_BASE_URL } from '../config';

const CATEGORIES = ['Design', 'Coding', 'Video', 'Writing', 'Marketing', 'Audio'];

export default function PostGig({ onGigPosted }) {
  const { currentUser } = useUser();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Design',
    rate: '',
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    if (!formData.title || !formData.rate || !formData.description) {
      setStatus({ loading: false, error: 'All fields are required.', success: '' });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/gigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          creatorId: currentUser.id,
          creatorName: currentUser.name
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post gig');
      }

      setStatus({ loading: false, error: '', success: 'Gig posted successfully!' });
      setFormData({ title: '', category: 'Design', rate: '', description: '' });

      if (onGigPosted) onGigPosted(data.gig);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h2>Post a New Gig</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
        Posting as: <strong>{currentUser.name}</strong>
      </p>

      {status.error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '4px' }}>{status.error}</div>}
      {status.success && <div style={{ color: '#10b981', marginBottom: '1rem', padding: '0.5rem', background: '#ecfdf5', borderRadius: '4px' }}>{status.success}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Gig Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., High-Converting YouTube Thumbnails"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Rate ($ USD)</label>
            <input
              type="number"
              name="rate"
              placeholder="150"
              min="1"
              value={formData.rate}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe what services you offer, deliverables, and turn-around time..."
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: status.loading ? '#94a3b8' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: status.loading ? 'not-allowed' : 'pointer'
          }}
        >
          {status.loading ? 'Posting...' : 'Publish Gig'}
        </button>
      </form>
    </div>
  );
}