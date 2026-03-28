export function postContact(req, res) {
  const { name, email, phone, subject, message } = req.body || {}

  const errors = {}
  if (!name || name.length < 2) errors.name = 'Invalid name'
  if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email || '')) errors.email = 'Invalid email'
  if (!/^\+?\d{10,14}$/.test(phone || '')) errors.phone = 'Invalid phone'
  if (!subject || subject.length < 3) errors.subject = 'Invalid subject'
  if (!message || message.length < 10) errors.message = 'Invalid message'

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors })
  }

  console.log('CONTACT_SUBMISSION', {
    name,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString()
  })

  return res.json({
    ok: true,
    message: 'Thank you. Our team will reach out shortly.'
  })
}
