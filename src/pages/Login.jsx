import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    // Mock auth: store an "auth" token in localStorage
    localStorage.setItem('vns_user', JSON.stringify({ email }))
    navigate('/dashboard')
  }

  return (
    <section>
      <h2>Sign in (demo)</h2>
      <form onSubmit={submit} className="form">
        <label>
          Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        <div className="actions">
          <button type="submit">Sign in</button>
          <Link to="/register" style={{marginLeft:10}}>Create account</Link>
        </div>
      </form>
    </section>
  )
}
