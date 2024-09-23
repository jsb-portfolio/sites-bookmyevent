'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'

import type {
  ForgotPwdFormData,
  LoginFormData,
  SignupFormData,
} from '@/types/zodSchema'

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/?message=No provider selected')
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'https://google.com',
    },
  })

  if (error) {
    return redirect('/?message=Could not authenticate user')
  }
  console.log(data)
  return redirect(data.url)
}

export async function emailLogin(prevState: any, formData: LoginFormData) {
  const supabase = createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    return { msg: error.toString() }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function forgotPwd(prevState: any, formData: ForgotPwdFormData) {
  const supabase = createClient()

  const data = {
    email: formData.email,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email)

  if (error) {
    return { msg: error.toString() }
  }

  redirect('/login')
}

export async function emailSignup(prevState: any, formData: SignupFormData) {
  const supabase = createClient()

  const data = {
    email: formData.email,
    username: formData.username,
    password: formData.password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { msg: error.toString() }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

