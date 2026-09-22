import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';
import { API_BASE_URL } from '../config';

export default function CreatorDashboard() {
  const { currentUser } = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCreatorBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings?creatorId=${currentUser.id}`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatorBookings();
  }, [currentUser.id]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setRequests(prev =>
          prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      alert('Failed to update booking status.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Creator Dashboard</h2>
      <p style={{ color: '#64748b' }}>
        Managing incoming requests for: <strong>{currentUser.name}</strong>
      </p>

      {loading ? (
        <p>Loading dashboard requests...</p>
      ) : requests.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', margin: 0 }}>No incoming booking requests yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requests.map(req => (
            <div key={req.id} style={{ border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{req.gigTitle}</h3>
                <StatusBadge status={req.status} />
              </div>

              <div style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.75rem' }}>
                Client: <strong>{req.clientName}</strong> | Value: <strong>${req.rate}</strong>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>Client Brief:</strong> "{req.requirements}"
              </div>

              {req.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleStatusUpdate(req.id, 'Accepted')}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Accept Booking
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(req.id, 'Declined')}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}