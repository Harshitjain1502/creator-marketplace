import React from 'react';

export default function GigCard({ gig, onSelectGig }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.25rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      <div>
        {/* Header: Category & Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            textTransform: 'uppercase'
          }}>
            {gig.category}
          </span>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
            ${gig.rate}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', margin: '0 0 0.5rem 0' }}>
          {gig.title}
        </h3>

        {/* Creator Info */}
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.75rem 0' }}>
          By <span style={{ fontWeight: '600', color: '#334155' }}>{gig.creatorName}</span>
        </p>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: '#475569',
          lineHeight: '1.4',
          margin: '0 0 1rem 0',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {gig.description}
        </p>
      </div>

      {/* Action Footer */}
      <button
        onClick={() => onSelectGig(gig)}
        style={{
          width: '100%',
          padding: '0.6rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Book Gig
      </button>
    </div>
  );
}