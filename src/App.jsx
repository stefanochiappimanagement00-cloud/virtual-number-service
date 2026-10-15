import React, { useState } from 'react'

const demoNumbers = [
  { id: 1, country: 'US', number: '+1 555-0100', sms: true, voice: true },
  { id: 2, country: 'GB', number: '+44 7700 900123', sms: true, voice: false },
  { id: 3, country: 'DE', number: '+49 30 1234567', sms: false, voice: true },
  { id: 4, country: 'IN', number: '+91 80 1234 5678', sms: true, voice: true }
]

export default function App() {
  const [route, setRoute] = useState('home')
  const [selected, setSelected] = useState(null)
  const [trialRequests, setTrialRequests] = useState([])
  const [pendingApproved, setPendingApproved] = useState([])

  function requestTrial(number) {
    const req = { id: Date.now(), number, status: 'pending', createdAt: new Date().toISOString() }
    setTrialRequests([req, ...trialRequests])
    alert('Trial request submitted (demo). It will remain pending until approved by admin.')
  }

  function approve(reqId) {
    setTrialRequests(trialRequests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r))
    const req = trialRequests.find(r => r.id === reqId)
    if (req) setPendingApproved([req, ...pendingApproved])
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Virtual Number Service (Demo)</h1>
        <nav>
          <button onClick={() => setRoute('home')}>Home</button>
          <button onClick={() => setRoute('browse')}>Browse Numbers</button>
          <button onClick={() => setRoute('dashboard')}>Dashboard</button>
          <button onClick={() => setRoute('admin')}>Admin</button>
        </nav>
      </header>

      <main className="container">
        {route === 'home' && (
          <section>
            <h2>Welcome</h2>
            <p>This demo shows a frontend for a virtual phone number service. No real numbers or messages are sent from this demo.</p>
            <ul>
              <li>Register and sign in screens: planned</li>
              <li>Browse numbers by country and capability</li>
              <li>Request free trial (pending admin approval)</li>
            </ul>
          </section>
        )}

        {route === 'browse' && (
          <section>
            <h2>Browse demo numbers</h2>
            <div className="grid">
              {demoNumbers.map(n => (
                <div key={n.id} className="card">
                  <div className="num">{n.number}</div>
                  <div className="meta">{n.country} • SMS: {n.sms ? 'Yes' : 'No'} • Voice: {n.voice ? 'Yes' : 'No'}</div>
                  <div className="actions">
                    <button onClick={() => { setSelected(n); requestTrial(n) }}>Request trial</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {route === 'dashboard' && (
          <section>
            <h2>Customer dashboard (demo)</h2>
            <p>Requests you've submitted (demo data):</p>
            <ul>
              {trialRequests.length === 0 && <li>No requests yet.</li>}
              {trialRequests.map(r => (
                <li key={r.id}>{r.number.number} — {r.status} — {new Date(r.createdAt).toLocaleString()}</li>
              ))}
            </ul>
          </section>
        )}

        {route === 'admin' && (
          <section>
            <h2>Admin dashboard (demo)</h2>
            <p>Approve or reject pending trial requests.</p>
            <ul>
              {trialRequests.filter(r => r.status === 'pending').map(r => (
                <li key={r.id}>
                  {r.number.number} — {r.status}
                  <button onClick={() => approve(r.id)}>Approve</button>
                </li>
              ))}
              {trialRequests.filter(r => r.status !== 'pending').length === 0 && <li>No requests processed yet.</li>}
            </ul>

            <h3>Approved (demo)</h3>
            <ul>
              {trialRequests.filter(r => r.status === 'approved').map(r => (
                <li key={r.id}>{r.number.number} — approved</li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="footer">
        <small>Demo site — not connected to Twilio or any telephony provider. Keep secrets out of this repo.</small>
      </footer>
    </div>
  )
}
