import React from 'react';

export default function StatusBadge({ status }) {
  let style = {
    padding: '0.25rem 0.6rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    display: 'inline-block',
    textTransform: 'uppercase'
  };

  if (status === 'Accepted') {
    style = { ...style, backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' };
  } else if (status === 'Declined') {
    style = { ...style, backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5' };
  } else {
    // Pending
    style = { ...style, backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde047' };
  }

  return <span style={style}>{status}</span>;
}