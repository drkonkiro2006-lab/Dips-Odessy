// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import contactRoutes from './routes/contactRoutes.js'
// import adminRoutes from './routes/adminRoutes.js';

// dotenv.config()
// const app = express()

// // --- 1. CONFIGURE CORS FIRST ---
// const allowed = (process.env.CORS_ORIGIN || 'http://localhost:5173')
//   .split(',')
//   .map(s => s.trim())

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       // Allow requests with no origin (like mobile apps or curl) 
//       // and allow origins in our allowed list
//       if (!origin || allowed.includes(origin)) return cb(null, true)
//       return cb(new Error('Not allowed by CORS'))
//     }
//   })
// )

// // --- 2. CONFIGURE PARSERS ---
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // --- 3. REGISTER ROUTES AFTER MIDDLEWARE ---
// app.get('/api/health', (req, res) => {
//   res.json({ ok: true, service: 'finance-tax-backend' })
// })

// app.use('/api/contact', contactRoutes)
// app.use('/api/admin', adminRoutes); // Admin routes now have CORS access

// export default app

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

dotenv.config()
const app = express()

// --- 1. CONFIGURE CORS FIRST ---
const allowed = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(s => s.trim())

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (like mobile apps or curl) 
      // and allow origins in our allowed list
      if (!origin || allowed.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    }
  })
)

// --- 2. CONFIGURE PARSERS ---
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// --- 3. REGISTER ROUTES AFTER MIDDLEWARE ---
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'finance-tax-backend' })
})

app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes); // Admin routes now have CORS access

export default app