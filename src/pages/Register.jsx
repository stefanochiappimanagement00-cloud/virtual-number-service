import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    // Mock registration: create basic user object in localStorage
    const user = { email }
    localStorage.setItem('vns_user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <section>
      <h2>Create demo account</h2>
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
          <button type="submit">Create account</button>
        </div>
      </form>
    </section>
  )
}
