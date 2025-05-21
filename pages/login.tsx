// pages/login.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginForm from '../components/Loginform'
import AuthLayout from '../components/Auth'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    // Check if user was redirected from successful registration
    if (router.query.registered === 'true') {
      setSuccessMessage('Registration successful! Please log in.')
    }
  }, [router.query])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        if (data.role === 'admin_created') {
          router.push('user/user-dashbaord')
        } else {
          router.push('/')
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('An error occurred. Please try again .')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login | Learning Platform</title>
        <meta name="description" content="Sign in to access your learning materials and courses" />
      </Head>
      <AuthLayout>
      <LoginForm 
  username={username}
  setUsername={setUsername}
  password={password}
  setPassword={setPassword}
  handleSubmit={handleSubmit}
  isLoading={isLoading}
  error={error}
  successMessage={successMessage}
  isRegisterPage={false}
  // Dummy register props to satisfy interface
  registerUsername=""
  setRegisterUsername={() => undefined}
  registerEmail=""
  setRegisterEmail={() => undefined}
  registerPassword=""
  setRegisterPassword={() => undefined}
  registerPhone=""
  setRegisterPhone={() => undefined}
  handleRegisterSubmit={async () => undefined}
  registerLoading={false}
  registerError=""
/>
      </AuthLayout>
    </>
  )
}