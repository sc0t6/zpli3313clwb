'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowUpRight, Check, FileArchive, LockKeyhole, LogOut, Trash2, UploadCloud } from 'lucide-react'
import { ZipMark } from '@/components/zip-mark'

type Release = { pathname: string; url: string; size: number; uploadedAt: string }

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function OwnerReleasesPage() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [releases, setReleases] = useState<Release[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const response = await fetch('/api/owner/releases')
    if (response.ok) { setAuthed(true); setReleases((await response.json()).releases) }
  }
  useEffect(() => { load() }, [])

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('')
    const response = await fetch('/api/owner/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
    if (response.ok) { setAuthed(true); setToken(''); await load() } else setMessage((await response.json()).error || 'Access denied.')
    setBusy(false)
  }

  async function upload(event: FormEvent) {
    event.preventDefault(); if (!file) return
    setBusy(true); setMessage('Uploading to Blob CDN…')
    const form = new FormData(); form.append('file', file)
    const response = await fetch('/api/owner/releases', { method: 'POST', body: form })
    const data = await response.json()
    if (response.ok) { setMessage('Release published to the CDN.'); setFile(null); await load() } else setMessage(data.error || 'Upload failed.')
    setBusy(false)
  }

  async function remove(pathname: string) {
    if (!window.confirm('Delete this release from the CDN?')) return
    await fetch('/api/owner/releases', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pathname }) }); await load()
  }

  async function logout() { await fetch('/api/owner/auth', { method: 'DELETE' }); setAuthed(false); setReleases([]) }

  return <main className="min-h-screen bg-background px-4 py-8 sm:px-8"><div className="mx-auto max-w-5xl">
    <header className="flex items-center justify-between border-b border-border pb-6"><a href="/" className="flex items-center gap-3"><ZipMark className="size-8" /><span className="font-semibold">Zip Client <span className="font-mono text-xs text-muted-foreground">/ owner</span></span></a>{authed && <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><LogOut className="size-4" /> Sign out</button>}</header>
    {!authed ? <section className="mx-auto flex max-w-md flex-col items-center py-28 text-center"><div className="mb-6 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary"><LockKeyhole className="size-6" /></div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Restricted area</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">Owner release portal</h1><p className="mt-4 leading-6 text-muted-foreground">Upload Zip Client builds to the public CDN. Access is restricted to the configured owner network.</p><form onSubmit={login} className="mt-8 flex w-full gap-2"><input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Owner token" required className="min-w-0 flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" /><button disabled={busy} className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50">Unlock</button></form>{message && <p className="mt-4 text-sm text-destructive">{message}</p>}</section> : <><section className="py-12"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Release control</p><div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h1 className="text-4xl font-semibold tracking-tight">Publish a build.</h1><p className="mt-3 text-muted-foreground">Public CDN storage for the next Zip Client release.</p></div><span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" /> IP locked · 87.246.155.39</span></div></section><form onSubmit={upload} className="rounded-2xl border border-border bg-card p-5"><label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 px-5 text-center hover:bg-primary/10"><UploadCloud className="mb-3 size-7 text-primary" /><span className="font-medium">Choose a launcher build</span><span className="mt-1 text-sm text-muted-foreground">ZIP only · maximum 750 MB</span><input type="file" accept=".zip,application/zip" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>{file && <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-3 text-sm"><span className="flex items-center gap-2"><FileArchive className="size-4 text-primary" />{file.name}</span><span className="text-muted-foreground">{formatSize(file.size)}</span></div>}<div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-sm text-muted-foreground">{message && <Check className="size-4 text-primary" />}{message}</p><button disabled={!file || busy} className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">{busy ? 'Publishing…' : 'Publish to CDN'}</button></div></form><section className="mt-12"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Published builds</h2><span className="font-mono text-xs text-muted-foreground">{releases.length} files</span></div><div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">{releases.length ? releases.map((release) => <div key={release.pathname} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-medium"><FileArchive className="size-4 text-primary" />{release.pathname.replace('releases/', '').replace(/^\d+-/, '')}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{formatSize(release.size)} · {new Date(release.uploadedAt).toLocaleString()}</p></div><div className="flex items-center gap-2"><a href={release.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground">Open CDN <ArrowUpRight className="size-3" /></a><button onClick={() => remove(release.pathname)} aria-label="Delete release" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button></div></div>) : <p className="p-8 text-center text-sm text-muted-foreground">No builds published yet.</p>}</div></section></>}
  </div></main>
}
