import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function BookingModal({ gig, onClose, onBookingSuccess }) {
  const { currentUser } = useUser();
  const [requirements, setRequirements] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', confirmed: false, bookingData: null });

  if (!gig) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', confirmed: false, bookingData: null });

    if (!requirements.trim()) {
      setStatus({ loading: false, error: 'Please describe your project requirements.', confirmed: false });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: gig.id,
          clientId: currentUser.id,
          clientName: currentUser.name,
          requirements: requirements
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setStatus({ loading: false, error: '', confirmed: true, bookingData: data.booking });
      if (onBookingSuccess) onBookingSuccess(data.booking);
    } catch (err) {
      setStatus({ loading: false, error: err.message, confirmed: false });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        padding: '1.75rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
            {status.confirmed ? 'Booking Confirmed!' : 'Book Gig'}
          </h2>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        {/* Confirmation Screen */}
        {status.confirmed ? (
          <div>
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Request Submitted!</p>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Your booking request for <strong>"{gig.title}"</strong> has been sent to <strong>{gig.creatorName}</strong>.
              </p>
            </div>

            <div style={{ fontSize: '0.875rem', color: '#334155', backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
              <div><strong>Booking ID:</strong> {status.bookingData?.id}</div>
              <div><strong>Status:</strong> <span style={{ color: '#d97706', fontWeight: 'bold' }}>Pending</span></div>
              <div><strong>Rate:</strong> ${gig.rate}</div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{gig.title}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Creator: {gig.creatorName} | Rate: <strong>${gig.rate}</strong>
              </div>
            </div>

            {status.error && (
              <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {status.error}
              </div>
            )}

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.4rem', color: '#334155', fontSize: '0.9rem' }}>
                Project Brief / Requirements
              </label>
              <textarea
                rows="4"
                placeholder="Describe your goals, deliverables, deadline, or relevant links..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{ padding: '0.6rem 1rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status.loading}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: status.loading ? '#94a3b8' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: status.loading ? 'not-allowed' : 'pointer'
                }}
              >
                {status.loading ? 'Submitting...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}