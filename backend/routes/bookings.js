const express = require('express');
const router = express.Router();

module.exports = function(bookings, gigs) {

  // POST /api/bookings - Book a Gig
  router.post('/', (req, res) => {
    const { gigId, clientId, clientName, requirements } = req.body;

    if (!gigId || !clientId || !requirements) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const targetGig = gigs.find(g => g.id === gigId);
    if (!targetGig) {
      return res.status(404).json({ error: 'Selected gig does not exist.' });
    }

    const newBooking = {
      id: `booking_${Date.now()}`,
      gigId: targetGig.id,
      gigTitle: targetGig.title,
      creatorId: targetGig.creatorId,
      creatorName: targetGig.creatorName,
      rate: targetGig.rate,
      clientId: clientId || 'user_client_1',
      clientName: clientName || 'Jordan (Client)',
      requirements: requirements.trim(),
      status: 'Pending', // Default status
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    return res.status(201).json({ message: 'Booking requested successfully', booking: newBooking });
  });

  // GET /api/bookings - Fetch bookings filtered by creator or client
  router.get('/', (req, res) => {
    const { creatorId, clientId } = req.query;
    let result = [...bookings];

    if (creatorId) {
      result = result.filter(b => b.creatorId === creatorId);
    } else if (clientId) {
      result = result.filter(b => b.clientId === clientId);
    }

    res.json(result);
  });

  // PATCH /api/bookings/:id/status - Accept or Decline a booking (DP1 & DP2)
  router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'Accepted' | 'Declined'

    if (!['Accepted', 'Declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status update value.' });
    }

    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    booking.status = status;
    booking.updatedAt = new Date().toISOString();

    return res.json({ message: `Booking status updated to ${status}`, booking });
  });

  return router;
};