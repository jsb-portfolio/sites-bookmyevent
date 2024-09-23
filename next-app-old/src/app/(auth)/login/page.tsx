'use client'
import { MdMail, MdKey } from 'react-icons/md'
import { emailLogin } from '../actions'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, loginSchema } from '@/types/zodSchema'
import FormInputError from '@/components/FormInputError'
import Link from 'next/link'

export default function LoginPage() {
  const [loginErr, onSubmit] = useFormState(emailLogin, { msg: '' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <label className="input input-bordered flex items-center gap-2">
        <MdMail />
        <input
          placeholder="Email"
          className="grow"
          required
          {...register('email')}
        />
        <FormInputError name="email" errors={errors} />
      </label>
      <div className="form-control">
        <label className="input input-bordered flex items-center gap-2">
          <MdKey />
          <input
            type="password"
            placeholder="Password"
            className="grow"
            required
            {...register('password')}
          />
          <FormInputError name="password" errors={errors} />
        </label>
        <label className="label">
          <Link href="/login/forgot-pwd"
            className="link-hover link label-text-alt">
            Forgot password?
          </Link>
        </label>
      </div>
      <button type="submit" className="btn btn-primary w-full mt-6 text-xl">
        Login
      </button>
      <p className="text-error">{loginErr?.msg}</p>
    </form>
  )
}
