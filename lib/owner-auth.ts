import { NextRequest, NextResponse } from 'next/server'

const OWNER_IP = '87.246.155.39'
const COOKIE_NAME = 'zip_access_9c2'

export function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',').at(-1)?.trim() || request.headers.get('x-real-ip') || ''
}

export function isOwnerRequest(request: NextRequest) {
  const token = process.env.OWNER_PORTAL_TOKEN
  if (!token) return false
  return getClientIp(request) === OWNER_IP && request.cookies.get(COOKIE_NAME)?.value === token
}

export function isValidCredentials(firstSecret: string, secondSecret: string) {
  return Boolean(
    firstSecret &&
      secondSecret &&
      firstSecret === process.env.OWNER_PORTAL_TOKEN &&
      secondSecret === process.env.ZIP_GATE_PASS_7F3A9C,
  )
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
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}

export const ownerCookieName = COOKIE_NAME
export const ownerIp = OWNER_IP
