import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div className="app">
      <header className="topbar">
        <h1>Virtual Number Service (Demo)</h1>
        <nav>
          <Link to="/" className="navbtn">Home</Link>
          <Link to="/browse" className="navbtn">Browse Numbers</Link>
          <Link to="/dashboard" className="navbtn">Dashboard</Link>
          <Link to="/admin" className="navbtn">Admin</Link>
          <Link to="/login" className="navbtn">Login</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/browse" element={<Browse/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>

      <footer className="footer">
        <small>Demo site — not connected to Twilio or any telephony provider. Keep secrets out of this repo.</small>
      </footer>
    </div>
  )
}
