import { lucia, validateAuth } from '@/utils/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout(): Promise<ActionResult> {
	'use server'
	const { session } = await validateAuth()
	if (!session) {
		return {
			error: 'Unauthorized'
		}
	}

	await lucia.invalidateSession(session.id)

	const sessionCookie = lucia.createBlankSessionCookie()
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
	return redirect('/login')
}

interface ActionResult {
	error: string | null
}
