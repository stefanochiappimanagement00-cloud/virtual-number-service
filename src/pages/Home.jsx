import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section>
      <h2>Welcome to the Virtual Number Service (Demo)</h2>
      <p>This demo helps you build a virtual phone number platform step-by-step. It uses mock data only. Do not enter real credentials or secrets here.</p>

      <h3>Quick actions</h3>
      <ul>
        <li><Link to="/browse">Browse demo numbers</Link></li>
        <li><Link to="/register">Create a demo account</Link></li>
        <li><Link to="/login">Sign in</Link></li>
      </ul>

      <h3>What this repo contains</h3>
      <p>A starter React + Vite frontend and a Cloudflare Workers skeleton in <code>functions/</code> for future backend routes.</p>

      <h3>Next steps</h3>
      <ol>
        <li>Try the browse page and request a demo trial.</li>
        <li>Test admin approval on the Admin page.</li>
        <li>When ready, deploy the worker to Cloudflare and replace demo flows with server-side storage.</li>
      </ol>
    </section>
  )
}
