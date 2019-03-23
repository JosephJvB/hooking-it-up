import React, { useState, useReducer, useEffect } from 'react'

import Toasts from './Toasts.jsx'
import SVGPointer from './SVGPointer.jsx'
import Footer from './Footer.jsx'

export default () => {

  // hooks are dooope
  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({email: '', not_a_password: ''})
  const [coords, setCoords] = useState({})
  const [svgClass, setSvgClass] = useState('fade-in')
  const [toasts, setToast] = useState([])
  const hasCoords = Object.keys(coords).length > 0

  // useEffect(() => console.log('Only call me on mount please :)'), [])
  // useEffect(() => console.log('SOMETHING is changing!')) // any re-render (componentDidUpdate)
  // watch a particular piece of component state
  // useEffect(() => console.log('token is changing!'), [token])
  // useEffect(() => console.log('formData is changing!'), [formData])
  
  const send = async (e) => {
    e.persist()
    const {email, not_a_password} = formData
    if(!email || !not_a_password) {
      console.error('dont test me I\'ll BOP ya')
      return
    }
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify(formData)
    try {
      const res = await fetch('/api/auth/register', {method: 'POST', headers, body})
      const token = await res.text()
      setToken(token)
      setFormData({email: '', not_a_password: ''})
      setTimeout(() => {
        showPointer({ // send svg pointer to the token element
          target: document.getElementById('token'),
          persist: e.persist
        })
      }, 1000)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = e => {
    e.persist() // react thing: synthetic events
    const dataType = e.target.getAttribute('data-type')
    // set formData keys as inputElements data-type attribute
    setFormData({
      ...formData,
      [dataType]: e.target.value
    })
  }

  const showPointer = e => {
    e.persist()
    const { bottom, right, height } = e.target.getBoundingClientRect()
    // fade out existing pointer
    setSvgClass('fade-out')
    // setCoords({ // for circle
    //   x: right + height,
    //   y: bottom - height / 2,
    //   r: 5
    // })
    setTimeout(() => {
      // fade in after timeout
      setSvgClass('fade-in')
      // triangle is 18px long(28-10), 16px high(8+8; 8px either side of middle)
      setCoords({
        p1: `${right + 10},${bottom - height / 2}`,
        p2: `${right + 28},${bottom - height / 2 - 8}`,
        p3: `${right + 28},${bottom - height / 2 + 8}`
      })
    }, 300)
  }

  const points = hasCoords && coords.p1 + ' ' + coords.p2 + ' ' + coords.p3

  return (
    <div>
      {toasts.length > 0 && <Toasts {...{setToast, toasts}} />}
      <div className="container">
        <h1 className="title">Welcome!</h1>
        <p className="subtitle"><i>So glad you made it</i></p>
        <div className="form">
          <div className="emoji-labels">
            <label className="label">📧</label>
            <label className="label">🔑</label>
          </div>
            {hasCoords && <SVGPointer {...{svgClass, points}} />}
          <div className="input-container">
            <input data-type="email" onFocus={showPointer} value={formData.email} onChange={handleChange} className="input" type="text"/>
            <input data-type="not_a_password" onFocus={showPointer} value={formData.not_a_password} onChange={handleChange} className="input" type="password"/>
          </div>
        </div>
        <button onFocus={showPointer} onClick={e => {send(e); setToast([...toasts, toasts.length])}} className="submit-button">SUBMIT</button>
        {/* <button onFocus={showPointer} onClick={e => {showPointer(e); send(e)}} className="submit-button">SUBMIT</button> */}
      </div>
      <Footer {...{token}} />
    </div>
  )
}