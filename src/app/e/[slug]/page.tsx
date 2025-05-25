import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !event) return notFound();

  const venmoLink = `https://venmo.com/${event.venmo_username}?txn=pay&amount=${event.drink_amount}&note=Happy+Birthday+🥳`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">🎉 {event.title}</h1>
      <p className="text-lg mb-2 text-gray-800">
        Buy a drink for <strong>@{event.venmo_username}</strong>
      </p>
      <p className="text-gray-700 mb-6">Suggested amount: ${event.drink_amount}</p>
      <a
        href={venmoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow"
      >
        Venmo a Drink 🍻
      </a>
    </div>
  );
}
