// src/app/api/create-event/route.ts

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  // 1) Parse body, including the userId you sent from the client
  const {
    userId,
    title,
    venmoUsername,
    drinkAmount,
    buttonText,
  }: {
    userId: string
    title: string
    venmoUsername: string
    drinkAmount: number
    buttonText: string
  } = await request.json()

  // 2) Guard: must have a userId
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // 3) Slug generation
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  const slug = `${slugBase}-${uuidv4().slice(0, 8)}`

  // 4) Build an object typed as your Insert type
  const newEvent = {
    user_id:        userId,
    title,
    slug,
    venmo_username: venmoUsername,
    drink_amount:   drinkAmount,
    button_text:    buttonText,
  } as Database['public']['Tables']['events']['Insert']

  // 5) Insert & select the slug
  const { data, error } = await supabase
    .from('events')
    .insert(newEvent)
    .select('slug')
    .single()

  // 6) Handle errors
  if (error || !data) {
    return NextResponse.json({ error }, { status: 500 })
  }

  // 7) Now TS knows data.slug exists
  return NextResponse.json({ slug: data.slug })
}
