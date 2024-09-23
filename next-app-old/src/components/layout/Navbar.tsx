'use client'
import Link from 'next/link'
import ProfileDropdown from './ProfileDropdown'
import { usePathname } from 'next/navigation'
export default function Navbar() {
  const pathname = usePathname()
  const headerLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
  ]
  return (
    <header>
      <nav className="navbar mt-2 max-w-screen-2xl mx-auto">
        <div className="flex-1">
          <Link href="/" className="text-3xl font-bold">
            Book my Event
          </Link>
        </div>
        <ul className="flex-none gap-10">
          {headerLinks.map((link) => (
            <li key={link.title} className={pathname === link.path ? 'text-primary' : 'link-hover'}>
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))}
          <li key={'profile'}>
            <ProfileDropdown />
          </li>
        </ul>
      </nav>
    </header>
  )
}
