# Finance & Tax Services Frontend

Modern React (Vite) SPA with Tailwind, Framer Motion, Router, Axios, Firebase Auth.

## Setup
- Create `.env` from `.env.example`
- Install dependencies: `npm install`
- Run dev server: `npm run dev`

## Environment
- `VITE_API_URL`: backend base URL (e.g., `http://localhost:5000`)
- `VITE_MAP_EMBED_URL`: Google Maps embed URL (Kolkata office)
- Firebase keys: `VITE_FIREBASE_*` from Firebase Console (Web App)

## Auth
- Email/password and Google OAuth using Firebase Authentication
- Persistent sessions with local storage
- Protected Dashboard route

## Pages
- Home, Services, Service Detail, About, Gallery, News, News Detail, Contact, Login, Signup, Dashboard

## Notes
- No secrets committed. Configure via `.env` only.
- Backend demo mode logs contact submissions; add DB later if needed.
