'use client';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase, type Database } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

type EventRow = Database['public']['Tables']['events']['Row']

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<EventRow[]>([])

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.user) return

      setUser(session.user)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', session.user.id)

      if (error) console.error(error)
      else setEvents(data)
    }
    load()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setEvents([])
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4 text-center px-4">
        <h1 className="text-3xl font-bold">Welcome to 21! 🎉</h1>
        <p>Login or register to start your birthday drink page.</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login / Register
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Hey {user.email} 👋</h1>

      {/* Logout + New Event buttons */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={handleLogout}
          className="bg-red-200 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
        <button
          onClick={() => router.push('/create-event')}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
        >
          + New Event
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Your Events</h2>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="border p-2 rounded">
            <p className="font-medium">{e.title}</p>
            <a
              className="text-blue-600 underline"
              href={`/e/${e.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Event
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
