import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Isso seria substituído pela lógica real do Stripe / Mercado Pago
    // const body = await request.text()
    // const sig = request.headers.get('stripe-signature') as string

    // Webhook event parsing...
    const event = await request.json()

    console.log(`Webhook Received:`, event.type)

    if (event.type === 'checkout.session.completed') {
      // Atualizar status do pedido no Supabase
      console.log('Payment success for session:', event.data.object.id)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook payload parsing failed', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }
}
