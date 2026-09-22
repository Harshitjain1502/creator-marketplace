# Creator Gig Marketplace

**Hackathon ID:** [AZIS-924E96]  
**Track:** Creator Economy / Gig Marketplace  
**Standard API Implemented:** Yes  

---

## Technical Stack
- **Frontend:** React (Vite) + JavaScript
- **Backend:** Node.js + Express (REST API)
- **State Management:** React UserContext (No-Auth Role Switcher)

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Run Backend Server
```bash
cd backend
npm install
npm run dev
```

### 2. Run Frontend
Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend uses the deployed backend API configured in `frontend/src/config.js`.

## Live Deployment

- **Frontend:** https://creator-marketplace-frontend.onrender.com
- **Backend API:** https://creator-marketplace-backend.onrender.com
- **Gigs API check:** https://creator-marketplace-backend.onrender.com/api/gigs
- **Vercel preview:** https://temporary-snappy-frost-y2urruw.vercel.app

The Vercel URL is an anonymous temporary deployment and expires after 60 minutes. The Render frontend URL is the persistent deployment link.

## API Routes

- `GET /api/gigs` - List gigs with category, search, and sort filters
- `POST /api/gigs` - Create a gig
- `GET /api/bookings` - List client or creator bookings
- `POST /api/bookings` - Create a booking request
- `PATCH /api/bookings/:id/status` - Accept or decline a booking