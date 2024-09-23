'use client'
import { MdMail, MdKey } from 'react-icons/md'
import { forgotPwd } from '../../actions'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPwdFormData, forgotPwdSchema } from '@/types/zodSchema'
import FormInputError from '@/components/FormInputError'

export default function ForgotPwdForm({ setActiveTab }: { setActiveTab: any }) {
  const [forgotPwdErr, formAction] = useFormState(forgotPwd, { msg: '' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPwdFormData>({
    resolver: zodResolver(forgotPwdSchema),
  })
  const onSubmit = (data: ForgotPwdFormData) => {
    formAction(data)
  }
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
      <div className="form-control mt-6 gap-1">
        <button type="submit" className="btn btn-primary w-full text-xl">
          Send Reset Link
        </button>
        <label className="label-text text-center">
          Go back to login page?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="link-hover link text-base text-secondary font-semibold">
            Login
          </button>
        </label>
      </div>
      {forgotPwdErr.msg && <p className="text-error">{forgotPwdErr.msg}</p>}
    </form>
  )
}
