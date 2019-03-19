import React, { useState, useReducer, useEffect } from 'react'

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

  const getTop = (i) => i * 55 + 5 * (i + 1) + 'px'

  return (
    <div>
      {toasts.length > 0 && toasts.slice(0, 5).map((t, i) => (
        <div key={i} style={{top: getTop(i)}} className="toast">
          <p>Hey I am a useful message alert</p>
          <p id="x" onClick={() => setToast([...toasts.slice(0, toasts.length - 1)])}>❌</p>
        </div>
      ))}
      <div className="container">
        <h1 className="title">Welcome!</h1>
        <p className="subtitle"><i>So glad you made it</i></p>
        <div className="form">
          <div className="emoji-labels">
            <label className="label">📧</label>
            <label className="label">🔑</label>
          </div>
          <div className="input-container">
            {hasCoords && <div id="svg-box" className={svgClass}>
              <svg style={{position:'absolute',left:0, top: 0, height: '100vh', width: '100vw', zIndex: -1}}>
                {/* {hasCoords && <circle cx={coords.x} cy={coords.y} r={coords.r} stroke="red" strokeWidth="2" fill="none" />} */}
                <polygon points={points} stroke="#f45f42" strokeWidth="2" fill="#f45f42" />
              </svg>
            </div>}
            <input data-type="email" onFocus={showPointer} value={formData.email} onChange={handleChange} className="input" type="text"/>
            <input data-type="not_a_password" onFocus={showPointer} value={formData.not_a_password} onChange={handleChange} className="input" type="password"/>
          </div>
        </div>
        <button onFocus={showPointer} onClick={e => setToast([...toasts, 1])} className="submit-button">SUBMIT</button>
        {/* <button onFocus={showPointer} onClick={e => {showPointer(e); send(e)}} className="submit-button">SUBMIT</button> */}
      </div>
      <footer className="footer">
        <p id="token">
          {token ? "token: "  + token.substring(0, 13) + '...'
          : "footer text footer text footer text footer text footer text footer text"}
        </p>
        <p>all rights are dope yaaaah yeet</p>
      </footer>
    </div>
  )
}