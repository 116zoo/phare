const recipient = 'contact@parisprivate.fr'

type ContactPayload = {
  email?: unknown
  name?: unknown
  phone?: unknown
  message?: unknown
  locale?: unknown
}

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = asText(payload.email)
  const name = asText(payload.name)
  const phone = asText(payload.phone)
  const message = asText(payload.message)
  const locale = asText(payload.locale) === 'en' ? 'en' : 'fr'

  if (!/^\S+@\S+\.\S+$/.test(email) || !name || !message) {
    return Response.json({ error: 'Email, name and message are required.' }, { status: 400 })
  }

  if (email.length > 254 || name.length > 160 || phone.length > 80 || message.length > 5000) {
    return Response.json({ error: 'One or more fields are too long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_EMAIL_FROM

  if (!apiKey || !from) {
    console.error('Contact form email delivery is not configured.')
    return Response.json({ error: 'Email delivery is not configured.' }, { status: 503 })
  }

  const subject = locale === 'en' ? `New contact message from ${name}` : `Nouveau message de ${name}`
  const body = [
    `Nom / Name : ${name}`,
    `Email : ${email}`,
    `Téléphone / Phone : ${phone || 'Non renseigné / Not provided'}`,
    `Langue / Language : ${locale}`,
    '',
    'Message :',
    message,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject,
      text: body,
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    console.error('Contact form email delivery failed:', details)
    return Response.json({ error: 'Unable to send the message.' }, { status: 502 })
  }

  return Response.json({ sent: true })
}
