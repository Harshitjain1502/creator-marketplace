import React, { useState, useEffect } from 'react';
import GigCard from '../components/GigCard';

const CATEGORIES = ['All', 'Design', 'Coding', 'Video', 'Writing', 'Marketing', 'Audio'];

export default function Browse({ onBookGig }) {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest'); // Addresses DP3

  // Fetch Gigs with live filters
  const fetchGigs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        category: selectedCategory,
        search: search,
        sort: sortOption
      });

      const response = await fetch(`http://localhost:5000/api/gigs?${query.toString()}`);
      if (!response.ok) throw new Error('Failed to load marketplace gigs');
      
      const data = await response.json();
      setGigs(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [selectedCategory, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGigs();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
          Creator Gig Marketplace
        </h1>
        <p style={{ color: '#64748b' }}>
          Discover top independent creators and book custom services instantly.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 300px', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search titles, skills, or creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '0.575rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.575rem 1rem',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>

        {/* Category & Ranking Dropdowns */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '0.575rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>

          {/* Ranking Option (DP3) */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '0.575rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
          >
            <option value="newest">Sort: Newest First (DP3)</option>
            <option value="cheapest">Sort: Price (Low to High)</option>
            <option value="priciest">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Grid State Handling */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>Loading marketplace listings...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: '#ef4444' }}>{error}</p>
      ) : gigs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
          <h3>No gigs found matching your criteria.</h3>
          <p>Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {gigs.map(gig => (
            <GigCard key={gig.id} gig={gig} onSelectGig={onBookGig} />
          ))}
        </div>
      )}
    </div>
  );
}