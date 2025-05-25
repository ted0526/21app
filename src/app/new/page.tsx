'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

    const res = await fetch('/api/create-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        venmoUsername,
        drinkAmount: parseFloat(drinkAmount),
        buttonText,
      }),
    });

    const data = await res.json();
    if (data.slug) {
      router.push(`/e/${data.slug}`);
    } else {
      setError(data.error?.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          🎉 Create Your Event
        </h1>

        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 text-gray-900"
        />

        <input
          type="text"
          placeholder="Venmo Username"
          value={venmoUsername}
          onChange={(e) => setVenmoUsername(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 text-gray-900"
        />

        <input
          type="number"
          placeholder="Drink Amount"
          value={drinkAmount}
          onChange={(e) => setDrinkAmount(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 text-gray-900"
        />

        <input
          type="text"
          placeholder="Button Text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 text-gray-900"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}