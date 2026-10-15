// Cloudflare Worker demo skeleton
// Note: This in-memory store is for local demo only. Workers are stateless and this will not persist across instances.

let TRIALS = []

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/trials')) {
      if (request.method === 'POST') {
        const body = await request.json().catch(()=>null)
        const trial = { id: Date.now(), number: body?.number || null, status: 'pending', createdAt: new Date().toISOString() }
        TRIALS.unshift(trial)
        return new Response(JSON.stringify(trial), { status: 201, headers: { 'Content-Type': 'application/json' } })
      }
      if (request.method === 'GET') {
        return new Response(JSON.stringify(TRIALS), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
    }

    if (url.pathname.startsWith('/api/admin/approve') && request.method === 'POST') {
      const body = await request.json().catch(()=>null)
      const id = body?.id
      TRIALS = TRIALS.map(t => t.id === id ? { ...t, status: 'approved' } : t)
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response('Not found', { status: 404 })
  }
}
