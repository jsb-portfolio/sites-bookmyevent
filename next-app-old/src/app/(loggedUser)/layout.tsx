import { getUser } from '@/actions/supabase'
import React from 'react'

export default async function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  return (
    <div className="hero flex-grow">
      <p>Hello {user?.email}</p>
      {children}
    </div>
  )
}
