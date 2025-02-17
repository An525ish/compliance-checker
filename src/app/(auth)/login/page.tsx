import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <LoginForm />
      </div>
    </div>
  )
}