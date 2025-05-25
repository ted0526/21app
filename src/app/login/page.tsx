// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 rounded shadow-lg"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--foreground)',
        }}
      >
        <h1 className="text-2xl font-bold text-center">Welcome Back! 🎉</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded text-[var(--foreground)] bg-[var(--background)] border-[var(--foreground)]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded font-semibold"
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
