import React, { useEffect, useState } from 'react'

const demoNumbers = [
  { id: 1, country: 'US', number: '+1 555-0100', sms: true, voice: true },
  { id: 2, country: 'GB', number: '+44 7700 900123', sms: true, voice: false },
  { id: 3, country: 'DE', number: '+49 30 1234567', sms: false, voice: true },
  { id: 4, country: 'IN', number: '+91 80 1234 5678', sms: true, voice: true }
]

export default function Browse(){
  const [numbers] = useState(demoNumbers)

  function requestTrial(number){
    // Save request to localStorage to simulate API
    const existing = JSON.parse(localStorage.getItem('vns_trials')||'[]')
    const req = { id: Date.now(), number, status: 'pending', createdAt: new Date().toISOString() }
    localStorage.setItem('vns_trials', JSON.stringify([req, ...existing]))
    alert('Trial request submitted (demo). It will remain pending until approved by admin.')
  }

  return (
    <section>
      <h2>Browse demo numbers</h2>
      <div className="grid">
        {numbers.map(n=> (
          <div key={n.id} className="card">
            <div className="num">{n.number}</div>
            <div className="meta">{n.country} • SMS: {n.sms ? 'Yes' : 'No'} • Voice: {n.voice ? 'Yes' : 'No'}</div>
            <div className="actions"><button onClick={()=>requestTrial(n)}>Request trial</button></div>
          </div>
        ))}
      </div>
    </section>
  )
}
