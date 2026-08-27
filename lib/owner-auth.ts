import { NextRequest, NextResponse } from 'next/server'

const OWNER_IP = '87.246.155.39'
const COOKIE_NAME = 'zip_owner_access'

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || ''
}

export function isOwnerRequest(request: NextRequest) {
  const token = process.env.OWNER_PORTAL_TOKEN
  if (!token) return false
  return getClientIp(request) === OWNER_IP && request.cookies.get(COOKIE_NAME)?.value === token
}

export function ownerDenied(request: NextRequest) {
  const ip = getClientIp(request)
  if (ip !== OWNER_IP) {
    return NextResponse.json({ error: 'Owner portal unavailable from this network.' }, { status: 403 })
  }
  return NextResponse.json({ error: 'Invalid owner token.' }, { status: 401 })
}

export function setOwnerCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, process.env.OWNER_PORTAL_TOKEN || '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/owner',
    maxAge: 60 * 60 * 8,
  })
  return response
}

export const ownerCookieName = COOKIE_NAME
export const ownerIp = OWNER_IP
