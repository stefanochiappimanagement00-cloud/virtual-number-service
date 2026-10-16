// Cloudflare Pages Functions style (export const onRequest)
// Demo in-memory storage — replace with KV/DB in production.

export const onRequest = async ({ request }) => {
  // very small router
  const url = new URL(request.url)
  const path = url.pathname.replace(/\/+$/, '') // trim trailing slash
  const method = request.method.toUpperCase()

  // Simple CORS helper
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // Initialize in-memory stores on the global object so state survives module lifecycle in dev/demo.
  if (!globalThis.__VNS_STORE__) {
    globalThis.__VNS_STORE__ = {
      numbers: [
        { id: 'US-1', country: 'US', number: '+1-555-0100', region: 'CA' },
        { id: 'US-2', country: 'US', number: '+1-555-0101', region: 'NY' },
        { id: 'GB-1', country: 'GB', number: '+44-20-5555-0100', region: 'London' },
        { id: 'DE-1', country: 'DE', number: '+49-30-5555-0100', region: 'Berlin' }
      ],
      trials: [] // { id, name, email, numberId, createdAt, approved }
    }
  }

  const store = globalThis.__VNS_STORE__

  try {
    // GET /api/numbers
    if (path.endsWith('/api/numbers') && method === 'GET') {
      return new Response(JSON.stringify({ numbers: store.numbers }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/trial
    if (path.endsWith('/api/trial') && method === 'POST') {
      const payload = await request.json().catch(() => ({}))
      const { name, email, numberId } = payload || {}
      if (!name || !email || !numberId) {
        return new Response(JSON.stringify({ error: 'name, email, numberId required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      const id = `t_${Date.now()}_${Math.floor(Math.random() * 10000)}`
      const trial = { id, name, email, numberId, createdAt: new Date().toISOString(), approved: false }
      store.trials.push(trial)
      return new Response(JSON.stringify({ trial }), {
        status: 201,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // GET /api/admin/trials
    if (path.endsWith('/api/admin/trials') && method === 'GET') {
      // Demo only — no auth. Replace with real auth in production.
      return new Response(JSON.stringify({ trials: store.trials }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/admin/approve
    if (path.endsWith('/api/admin/approve') && method === 'POST') {
      const { id } = await request.json().catch(() => ({}))
      if (!id) {
        return new Response(JSON.stringify({ error: 'id required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      const t = store.trials.find(x => x.id === id)
      if (!t) {
        return new Response(JSON.stringify({ error: 'not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      t.approved = true
      return new Response(JSON.stringify({ trial: t }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // Unknown route
    return new Response(JSON.stringify({ error: 'not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'internal', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
}