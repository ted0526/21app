// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // On successful sign up, redirect to login
      router.push('/login');
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
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
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
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
