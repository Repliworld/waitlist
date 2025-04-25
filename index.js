import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

// Middleware
app.use(cors())
app.use(express.json())

// POST endpoint to add email to waitlist
app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body

  // Simple validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  // Insert the email into the 'waitlist' table
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email }])

  // Error handling
  if (error) {
    console.log("Error inserting email:", error)
    return res.status(500).json({ error: 'Error inserting into waitlist because some motherfucker trying to insert same thing again n again' })
  }

  // Success response
  res.status(200).json({ message: 'Email added to waitlist successfully!' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
