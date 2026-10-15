import React, { useEffect, useState } from 'react'

export default function Admin(){
  const [trials, setTrials] = useState([])

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('vns_trials')||'[]')
    setTrials(stored)
  },[])

  function approve(id){
    const updated = trials.map(t => t.id === id ? { ...t, status: 'approved' } : t)
    setTrials(updated)
    localStorage.setItem('vns_trials', JSON.stringify(updated))
  }

  return (
    <section>
      <h2>Admin dashboard (demo)</h2>
      <p>Approve or reject pending trial requests.</p>
      <ul>
        {trials.filter(r => r.status === 'pending').map(r => (
          <li key={r.id}>
            {r.number.number} — {r.status}
            <button style={{marginLeft:8}} onClick={()=>approve(r.id)}>Approve</button>
          </li>
        ))}
        {trials.filter(r => r.status !== 'pending').length === 0 && <li>No requests processed yet.</li>}
      </ul>

      <h3>Approved (demo)</h3>
      <ul>
        {trials.filter(r => r.status === 'approved').map(r => (
          <li key={r.id}>{r.number.number} — approved</li>
        ))}
      </ul>
    </section>
  )
}
