import { Provider } from '@supabase/supabase-js'
import { FcGoogle } from 'react-icons/fc'
import { oAuthSignIn } from '../actions'
type OAuthProvider = {
  name: Provider
  displayName: string
  icon?: JSX.Element
}

export default function OAuthLogin() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: 'google',
      displayName: 'Google',
      icon: <FcGoogle className="size-5" />,
    },
  ]

  return (
    <>
    <div className='card-body flex-col pt-0 gap-2'>
      {oAuthProviders.map((provider) => (
        <button
          key={provider.name}
          className="btn btn-ghost w-full text-xl"
          onClick={async () => {
            await oAuthSignIn(provider.name)
          }}>
          {provider.icon}
          Login with {provider.displayName}
        </button>
      ))}
    </div>
    </>
  )
}
