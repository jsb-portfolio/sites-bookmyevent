'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Links() {
	const pathname = usePathname()
	const headerLinks = [
		{
			title: 'Home',
			path: '/'
		},
		{
			title: 'About',
			path: '/about'
		},
		{
			title: 'Contact',
			path: '/contact'
		}
	]
	return (
		<>
			{headerLinks.map((link) => (
				<li key={link.title} className={pathname === link.path ? 'text-primary' : 'link-hover'}>
					<Link href={link.path}>{link.title}</Link>
				</li>
			))}
		</>
	)
}
