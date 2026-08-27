import { del, list, put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { isOwnerRequest, ownerDenied } from '@/lib/owner-auth'

const MAX_FILE_SIZE = 750 * 1024 * 1024
const ALLOWED_TYPES = new Set(['application/zip', 'application/x-zip-compressed', 'application/octet-stream'])

export async function GET(request: NextRequest) {
  if (!isOwnerRequest(request)) return ownerDenied(request)
  const { blobs } = await list({ prefix: 'releases/' })
  return NextResponse.json({ releases: blobs.map(({ pathname, url, size, uploadedAt }) => ({ pathname, url, size, uploadedAt })) })
}

export async function POST(request: NextRequest) {
  if (!isOwnerRequest(request)) return ownerDenied(request)
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Choose a file to upload.' }, { status: 400 })
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Files must be smaller than 750 MB.' }, { status: 413 })
  if (!ALLOWED_TYPES.has(file.type) && !file.name.toLowerCase().endsWith('.zip')) return NextResponse.json({ error: 'Only .zip launcher files are accepted.' }, { status: 415 })
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const blob = await put(`releases/${Date.now()}-${safeName}`, file, { access: 'public', addRandomSuffix: false })
  return NextResponse.json({ pathname: blob.pathname, url: blob.url, size: blob.size, uploadedAt: blob.uploadedAt })
}

export async function DELETE(request: NextRequest) {
  if (!isOwnerRequest(request)) return ownerDenied(request)
  const { pathname } = await request.json().catch(() => ({}))
  if (!pathname || typeof pathname !== 'string' || !pathname.startsWith('releases/')) return NextResponse.json({ error: 'Invalid release.' }, { status: 400 })
  const { blobs } = await list({ prefix: pathname })
  if (!blobs[0]) return NextResponse.json({ error: 'Release not found.' }, { status: 404 })
  await del(blobs[0].url)
  return NextResponse.json({ ok: true })
}
