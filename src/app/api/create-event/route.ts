import { NextResponse } from 'next/server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  const body = await req.json();
  const { title, venmoUsername, drinkAmount } = body;

  if (!title || !venmoUsername || !drinkAmount) {
    return NextResponse.json({ error: { message: 'Missing fields' } }, { status: 400 });
  }

  const slug = nanoid(8);
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from('events').insert([
    {
      title,
      venmo_username: venmoUsername,
      drink_amount: drinkAmount,
      slug,
    },
  ]);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ slug });
}
