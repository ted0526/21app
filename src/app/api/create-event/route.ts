// src/app/api/create-event/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const { title, venmoUsername, drinkAmount, buttonText } = await request.json();

  // generate a unique slug however you like
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + uuidv4().slice(0, 8);

  const {
    data,
    error,
  } = await supabase
    .from('events')
    .insert({
      // user_id: ... pull from your session/auth
      title,
      slug,
      venmo_username: venmoUsername,
      drink_amount: drinkAmount,
      button_text: buttonText,
    })
    .select('slug')
    .single();

  if (error || !data) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ slug: data.slug });
}
