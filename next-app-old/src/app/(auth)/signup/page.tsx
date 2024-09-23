'use client'
import { MdMail, MdKey, MdPerson } from 'react-icons/md'
import { emailSignup } from '../actions'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupFormData, signupSchema } from '@/types/zodSchema'
import FormInputError from '@/components/FormInputError'

export default function SignupForm() {
  const [signupErr, formAction] = useFormState(emailSignup, { msg: '' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })
  const onSubmit = (data: SignupFormData) => {
    formAction(data)
  }
  return (
    <>
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
        <label className="input input-bordered flex items-center gap-2">
          <MdPerson />
          <input
            placeholder="Username"
            className="grow"
            required
            {...register('username')}
          />
          <FormInputError name="username" errors={errors} />
        </label>
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
        <label className="input input-bordered flex items-center gap-2">
          <MdKey />
          <input
            type="password"
            placeholder="Confirm Password"
            className="grow"
            required
            {...register('confirmPassword')}
          />
          <FormInputError name="confirmPassword" errors={errors} />
        </label>
        <button type="submit" className="btn btn-primary w-full text-xl mt-8">
          Sign up
        </button>
      </form>
      <p className="text-error">{signupErr?.msg}</p>
    </>
  )
}
