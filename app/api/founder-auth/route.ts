import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    const founderPassword = process.env.FOUNDER_PASSWORD

    if (!founderPassword) {
      return NextResponse.json(
        { error: 'Password not configured' },
        { status: 500 }
      )
    }

    if (password === founderPassword) {
      const cookieStore = await cookies()
      cookieStore.set('eco_founder_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('eco_founder_session')
  return NextResponse.json({ success: true })
}
