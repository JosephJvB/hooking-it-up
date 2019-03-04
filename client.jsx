import React, { useState } from 'react'
import { render } from 'react-dom'

import './main.css'

document.addEventListener('DOMContentLoaded', () => {
  render (<App />, document.getElementById('mount'))
})

const App = () => {

  // hooks are dooope
  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({})

  const send = async () => {
    const {email, password} = formData
    if(!email || !password) {
      console.error('dont test me I\'ll BOP ya')
      return
    }
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({email, not_a_password: password})
    const res = await fetch('/api/auth/register', {method: 'POST', headers, body})
    const token = await res.text()
    setToken(token)
  }

  const handleChange = e => {
    e.persist() // react thing: synthetic events
    setFormData({
      ...formData,
      [e.target.type]: e.target.value
    })
  }

  return (
    <div>
      <div className="container">
        <h1 className="title">Welcome!</h1>
        <p className="subtitle"><i>So glad you made it</i></p>
        <div className="form">
          <div className="emoji-labels">
            <label className="label">📧</label>
            <label className="label">🔑</label>
          </div>
          <div className="input-container">
            <input onChange={handleChange} className="input" type="email"/>
            <input onChange={handleChange} className="input" type="password"/>
          </div>
        </div>
        <button onClick={send} className="submit-button">SUBMIT</button>
      </div>
      <footer className="footer">
        {token ? <p>token: {token.substring(0, 13)}...</p> : <p>footer text footer text footer text footer text footer text footer text</p>}
        <p>all rights are dope yaaaah yeet</p>
      </footer>
    </div>
  )
}