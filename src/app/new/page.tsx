// src/app/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [venmoUsername, setVenmoUsername] = useState('');
  const [drinkAmount, setDrinkAmount] = useState('5');
  const [buttonText, setButtonText] = useState('Venmo a Drink 🍻');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session?.user?.id) {
      setError('Not authenticated. Please log in first.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/create-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:       session.user.id,
        title,
        venmoUsername,
        drinkAmount:  parseFloat(drinkAmount),
        buttonText,
      }),
    });

    const payload = await res.json();
    if (res.ok && payload.slug) {
      router.push(`/e/${payload.slug}`);
    } else {
      setError(payload.error?.message || 'Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">🎉 Create Your Event</h1>
        {error && <p className="text-red-600">{error}</p>}

        {/** Inputs all inherit bg/fg from CSS vars **/}
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2 text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />

        <input
          type="text"
          placeholder="Venmo Username"
          value={venmoUsername}
          onChange={e => setVenmoUsername(e.target.value)}
          required
          className="w-full border rounded p-2 text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />

        <input
          type="number"
          placeholder="Drink Amount"
          value={drinkAmount}
          onChange={e => setDrinkAmount(e.target.value)}
          required
          className="w-full border rounded p-2 text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />

        <input
          type="text"
          placeholder="Button Text"
          value={buttonText}
          onChange={e => setButtonText(e.target.value)}
          required
          className="w-full border rounded p-2 text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded font-semibold"
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)'
          }}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
