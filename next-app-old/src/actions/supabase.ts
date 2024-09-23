'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function getUser() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
