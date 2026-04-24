'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FounderLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/founder-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/board')
        router.refresh()
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold">Founder Access</h1>
          <p className="text-sm text-gray-400">Internal systems only</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-white"
                placeholder="Enter founder password"
                required
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-600"
            >
              {loading ? 'Authenticating...' : 'Access Board'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-white">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
