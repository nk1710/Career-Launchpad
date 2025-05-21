// utils/withUserAuth.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

export default function withUserAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithUserAuth(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null // User token

        if (!token) {
          router.replace('/login') // Redirect to user login
          return
        }

        try {
          const response = await fetch('/api/auth/user-verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()

          if (response.ok && data.valid) {
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem('token')
            router.replace('/login')
          }
        } catch (error) {
          console.error('User auth verification failed:', error)
          localStorage.removeItem('token')
          router.replace('/login')
        } finally {
          setIsLoading(false)
        }
      }

      checkAuth()
    }, [router])

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">Verifying user session...</div>
        </div>
      )
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }
}
