import React, { useState } from 'react'
import { render } from 'react-dom'

import styles from './styles'

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
      <div style={{...styles.container}}>
        <h1 style={{...styles.title}}>Welcome!</h1>
        <p style={{...styles.subtitle}}><i>So glad you made it</i></p>
        <div style={{...styles.form}}>
          <div style={{...styles.labels}}>
            <label style={{...styles.label}}>📧</label>
            <label style={{...styles.label}}>🔑</label>
          </div>
          <div style={{...styles.inputs}}>
            <input onChange={handleChange} style={{...styles.input}} type="email"/>
            <input onChange={handleChange} style={{...styles.input}} type="password"/>
          </div>
        </div>
        <div style={{...styles.submit}}>
          <p style={{...styles.hand}}>👉</p>
          <button onClick={send} style={{...styles.button}}>SUBMIT</button>
        </div>
      </div>
      <footer style={{...styles.footer}}>
        {token ? <p>token: {token.substring(0, 13)}...</p> : <p>footer text footer text footer text footer text footer text footer text</p>}
        <p>all rights are dope yaaaah yeet</p>
      </footer>
    </div>
  )
}