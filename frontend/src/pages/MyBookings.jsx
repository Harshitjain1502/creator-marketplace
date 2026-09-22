import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import StatusBadge from '../components/StatusBadge';
import { API_BASE_URL } from '../config';

export default function MyBookings({ onBrowseMore }) {
  const { currentUser } = useUser();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings?clientId=${currentUser.id}`);
      const data = await res.json();
      setMyBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, [currentUser.id]);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>My Bookings</h2>
      <p style={{ color: '#64748b' }}>
        Track your project order requests as client: <strong>{currentUser.name}</strong>
      </p>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : myBookings.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b' }}>You have not booked any gigs yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {myBookings.map(b => (
            <div key={b.id} style={{ border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '8px', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{b.gigTitle}</h3>
                <StatusBadge status={b.status} />
              </div>

              <div style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.75rem' }}>
                Creator: <strong>{b.creatorName}</strong> | Price: <strong>${b.rate}</strong>
              </div>

              {/* DP1 Client Recovery Behavior */}
              {b.status === 'Declined' && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '6px', fontSize: '0.875rem', color: '#991b1b', marginBottom: '0.5rem' }}>
                  <strong>Notice:</strong> The creator declined this request. You can browse alternative creators or submit a new project request.
                  <button
                    onClick={onBrowseMore}
                    style={{ marginTop: '0.5rem', display: 'block', padding: '0.4rem 0.8rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Find Other Creators
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