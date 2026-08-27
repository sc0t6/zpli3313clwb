import { NextRequest, NextResponse } from 'next/server'
import { ownerIp, setOwnerCookie } from '@/lib/owner-auth'

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || ''
  if (clientIp !== ownerIp) return NextResponse.json({ error: 'Owner portal unavailable from this network.' }, { status: 403 })
  const body = await request.json().catch(() => ({}))
  if (!process.env.OWNER_PORTAL_TOKEN || body.token !== process.env.OWNER_PORTAL_TOKEN) {
    return NextResponse.json({ error: 'Invalid owner token.' }, { status: 401 })
  }
  return setOwnerCookie(NextResponse.json({ ok: true }))
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('zip_owner_access')
  return response
}
