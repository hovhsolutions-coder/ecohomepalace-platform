'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/founder-auth', { method: 'DELETE' })
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-400 transition hover:border-red-500 hover:text-red-400"
    >
      Logout
    </button>
  )
}
