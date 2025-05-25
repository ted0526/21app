'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './supabase'
import { useState } from 'react'

export function useBrowserSupabase() {
  // memoize so it only creates once per page
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )
  return supabase
}
