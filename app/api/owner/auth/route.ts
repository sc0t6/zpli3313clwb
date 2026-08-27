import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, isValidCredentials, ownerIp, setOwnerCookie } from '@/lib/owner-auth'

export async function POST(request: NextRequest) {
  if (getClientIp(request) !== ownerIp) {
    return NextResponse.json({ error: 'Owner portal unavailable from this network.' }, { status: 403 })
  }
  const body = await request.json().catch(() => ({}))
  const firstSecret = typeof body.firstSecret === 'string' ? body.firstSecret : ''
  const secondSecret = typeof body.secondSecret === 'string' ? body.secondSecret : ''
  if (!isValidCredentials(firstSecret, secondSecret)) {
    return NextResponse.json({ error: 'Invalid access details.' }, { status: 401 })
  }
  return setOwnerCookie(NextResponse.json({ ok: true }))
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('zip_access_9c2')
  return response
}
