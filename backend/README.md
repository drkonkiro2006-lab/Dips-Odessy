# Finance & Tax Services Backend

Production-ready Express server providing JSON APIs for the frontend.

## Setup
- Create `.env` from `.env.example`
- Install dependencies: `npm install`
- Start server: `npm run dev` (or `npm start`)

## Environment
- `PORT`: default 5000
- `CORS_ORIGIN`: comma-separated allowed origins (e.g., `http://localhost:5173`)

## APIs
- `POST /api/contact`
  - Body: `{ name, email, phone, subject, message }`
  - Validates input, logs submission, returns `{ ok, message }`

## Notes
- Demo mode: requests are validated and logged to console; no database is used.
- Add persistence later (e.g., PostgreSQL/Mongo) without changing the route contract.
