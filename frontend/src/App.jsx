import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import PostGig from './pages/PostGig';
import CreatorDashboard from './pages/CreatorDashboard';
import MyBookings from './pages/MyBookings';
import BookingModal from './components/BookingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedGigToBook, setSelectedGigToBook] = useState(null);

  return (
    <UserProvider>
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ paddingBottom: '3rem' }}>
          {activeTab === 'browse' && (
            <Browse onBookGig={(gig) => setSelectedGigToBook(gig)} />
          )}

          {activeTab === 'post' && (
            <PostGig onGigPosted={() => setActiveTab('browse')} />
          )}

          {activeTab === 'dashboard' && (
            <CreatorDashboard />
          )}

          {activeTab === 'bookings' && (
            <MyBookings onBrowseMore={() => setActiveTab('browse')} />
          )}
        </main>

        {/* Modal for Booking a Gig */}
        {selectedGigToBook && (
          <BookingModal
            gig={selectedGigToBook}
            onClose={() => setSelectedGigToBook(null)}
            onBookingSuccess={() => {
              // Option to direct client straight to their bookings
              setActiveTab('bookings');
            }}
          />
        )}
      </div>
    </UserProvider>
  );
}