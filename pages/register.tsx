// pages/register.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginForm from '../components/Loginform'
import AuthLayout from '../components/Auth'

export default function RegisterPage() {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const router = useRouter()

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterLoading(true)
    setRegisterError('')

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          phone: registerPhone,
        }),
      })

      if (res.ok) {
        router.push('/login?registered=true')
      } else {
        const data = await res.json()
        setRegisterError(
          data.message || 'Registration failed. Please try again.'
        )
      }
    } catch (err) {
      setRegisterError('An error occurred. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register | Learning Platform</title>
        <meta name="description" content="Create an account to access courses and learning materials" />
      </Head>
      <AuthLayout>
        <LoginForm 
          isRegisterPage={true}
          registerUsername={registerUsername}
          setRegisterUsername={setRegisterUsername}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          registerPhone={registerPhone}
          setRegisterPhone={setRegisterPhone}
          handleRegisterSubmit={handleRegisterSubmit}
          registerLoading={registerLoading}
          registerError={registerError}
          // Dummy login props to satisfy interface
          username=""
          setUsername={() => { /* intentionally empty */ }}
          password=""
          setPassword={() => { /* intentionally empty */ }}
          handleSubmit={() => { /* intentionally empty */ return Promise.resolve() }}
          isLoading={false}
          error=""
        />
      </AuthLayout>
    </>
  )
}