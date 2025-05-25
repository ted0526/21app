import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import type { Database } from '@/lib/supabase'

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = createServerComponentClient<Database>({ cookies: () => cookies() })

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !event) return notFound()

  // pick up your custom text (or fallback)
  const venmoButtonText = event.button_text ?? 'Venmo a Drink 🍻'

  const venmoLink = `https://venmo.com/${event.venmo_username
    }?txn=pay&amount=${event.drink_amount}&note=Happy+Birthday+🥳`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center text-gray-900">
      <h1 className="text-3xl font-bold mb-4">🎉 {event.title}</h1>
      <p className="text-lg mb-2">
        Buy a drink for <strong>@{event.venmo_username}</strong>
      </p>
      <p className="text-gray-700 mb-6">Suggested amount: ${event.drink_amount}</p>
      <a
        href={venmoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow"
      >
        {venmoButtonText}
      </a>
    </div>
  )
}
