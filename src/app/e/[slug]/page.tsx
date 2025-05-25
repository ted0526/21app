// src/app/e/[slug]/page.tsx
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound } from 'next/navigation'
import type { Database } from '@/lib/supabase'
import ShareButton from '@/components/ShareButton'

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // await the params to get your slug
  const { slug } = await params

  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !event) return notFound()

  const venmoLink = `https://venmo.com/${event.venmo_username}?txn=pay&amount=${event.drink_amount}&note=🥳`

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <h1 className="text-3xl font-bold mb-4">🎉 {event.title}</h1>
      <p className="text-lg mb-2">
        Buy a drink for <strong>@{event.venmo_username}</strong>
      </p>
      <p className="mb-6">Suggested: ${event.drink_amount}</p>
      <a
        href={venmoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl"
        style={{
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
        }}
      >
        {event.button_text || 'Venmo a Drink 🍻'}
      </a>
      <ShareButton />
    </div>
  )
}
