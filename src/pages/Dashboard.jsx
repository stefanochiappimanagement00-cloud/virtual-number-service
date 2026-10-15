import React, { useEffect, useState } from 'react'

export default function Dashboard(){
  const [trials, setTrials] = useState([])

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('vns_trials')||'[]')
    setTrials(stored)
  },[])

  return (
    <section>
      <h2>Customer dashboard (demo)</h2>
      <p>Your demo requests:</p>
      <ul>
        {trials.length === 0 && <li>No requests yet.</li>}
        {trials.map(r => (
          <li key={r.id}>{r.number.number} — {r.status} — {new Date(r.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </section>
  )
}
