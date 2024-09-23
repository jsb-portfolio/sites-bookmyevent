'use client'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProfileDropdown() {
  const [session, setSession] = useState<any>(null)
  useEffect(() => {
    const supabase = createClient()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session })
      if (event === 'SIGNED_IN') {
        setSession(session)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      {session ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="btn btn-primary">
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      ) : (
        <Link href="/login" className="btn btn-primary btn-sm h-10 w-24">
          Login
        </Link>
      )}
    </>
  )
}
