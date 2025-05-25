'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase.from('events').select('*').eq('user_id', session.user.id);
        setEvents(data || []);
      }
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to 21! 🎉</h1>
        <p>Login or register to start your birthday drink page.</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Hey {user.email} 👋</h1>
      <button
        onClick={handleLogout}
        className="mb-4 bg-gray-200 px-3 py-1 rounded text-sm"
      >
        Logout
      </button>
      <h2 className="text-xl font-semibold mb-2">Your Events</h2>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="border p-2 rounded">
            <p className="font-medium">{e.title}</p>
            <a
              className="text-blue-600 underline"
              href={`/e/${e.slug}`}
              target="_blank"
            >
              View Event
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}