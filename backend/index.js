const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Shared Seed Data
let gigs = [
  {
    id: 'gig_1',
    creatorId: 'user_creator_1',
    creatorName: 'Alex Rivers',
    title: 'Custom YouTube Thumbnail & Logo Design',
    category: 'Design',
    rate: 150,
    description: 'High-converting 4K custom thumbnails designed to maximize CTR.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'gig_2',
    creatorId: 'user_creator_2',
    creatorName: 'Sam Tech',
    title: 'React & Next.js Landing Page Build',
    category: 'Coding',
    rate: 350,
    description: 'Responsive, ultra-fast landing pages built with Tailwind CSS.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

let bookings = [];

// Mount Routers
const gigRoutes = require('./routes/gigs')(gigs);
const bookingRoutes = require('./routes/bookings')(bookings, gigs);

app.use('/api/gigs', gigRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));