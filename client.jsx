import React, { useState, useReducer, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import './main.css' // import css so webpack will inject .css contents into <head><style> tag

document.addEventListener('DOMContentLoaded', () => {
  render(<Router />, document.getElementById('mount'))
})

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/test' component={ReducerTester}/>
        <Route component={FourOhFour} /> 
      </Switch>
    </BrowserRouter>
  )
}

const FourOhFour = () => <h1>BROKEN</h1>

const Home = () => {

  // hooks are dooope
  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({email: '', not_a_password: ''})
  const [coords, setCoords] = useState({})
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
    const svgEl = document.getElementById('svg-box')
    // if exists, fade out
    if(svgEl) {
      svgEl.classList.remove('fade-in')
      svgEl.classList.add('fade-out')
    }
    // setCoords({ // for circle
    //   x: right + height,
    //   y: bottom - height / 2,
    //   r: 5
    // })
    setTimeout(() => {
      // if exists, remove fadeout class & fade in
      if(svgEl) {
        svgEl.classList.remove('fade-out')
        svgEl.classList.add('fade-in')
      }
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
      <div className="container">
        <h1 onClick={showPointer} className="title">Welcome!</h1>
        <p onClick={showPointer} className="subtitle"><i>So glad you made it</i></p>
        <div className="form">
          <div className="emoji-labels">
            <label className="label">📧</label>
            <label className="label">🔑</label>
          </div>
          <div className="input-container">
            {hasCoords && <div id="svg-box" className="svg-box">
              <svg style={{position:'absolute',left:0, top: 0, height: '100vh', width: '100vw', zIndex: -1}}>
                {/* {hasCoords && <circle cx={coords.x} cy={coords.y} r={coords.r} stroke="red" strokeWidth="2" fill="none" />} */}
                <polygon points={points} stroke="#f45f42" strokeWidth="2" fill="#f45f42" />
              </svg>
            </div>}
            <input data-type="email" onClick={showPointer} value={formData.email} onChange={handleChange} className="input" type="text"/>
            <input data-type="not_a_password" onClick={showPointer} value={formData.not_a_password} onChange={handleChange} className="input" type="password"/>
          </div>
        </div>
        <button onClick={(e) => {showPointer(e); send(e)}} className="submit-button">SUBMIT</button>
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

// Q: can two components share state from the same reducer?
// A: no, each inits their own instance of the reducer. share logic, state still exclusive
const ReducerTester = () => {
  return (
    <React.Fragment>
      <ReducerOne />
      <ReducerTwo />
    </React.Fragment>
  )
}

// contrived example
const reducer = (state, action) => {
  switch(action.type) {
    case 'PLUS': return  {...state, count: state.count+1}
    case 'MINUS': return  {...state, count: state.count-1}
    default: return state
  }
}

const ReducerOne = () => {
  const init = {count: 0}
  const [state, dispatch] = useReducer(reducer, init)
  const plus = () => dispatch({type: 'PLUS'})
  const minus = () => dispatch({type: 'MINUS'})

  useEffect(() => console.log('child1 count change'), [state.count])
  // also works!
  useEffect(() => console.log('child1 state change'), [state])
  
  return (
    <div>
     CHILD ONE count = {state.count}
     <button onClick={plus}>+</button>
     <button onClick={minus}>-</button>
   </div>
 ) 
}

const ReducerTwo = () => {
  const init = {count: 5}
  const [state, dispatch] = useReducer(reducer, init)
  const plus = () => dispatch({type: 'PLUS'})
  const minus = () => dispatch({type: 'MINUS'})

  useEffect(() => console.log('child2 count change'), [state.count])
  // also works!
  useEffect(() => console.log('child2 state change'), [state])

 return (
   <div>
     CHILD TWO count = {state.count}
     <button onClick={plus}>+</button>
     <button onClick={minus}>-</button>
   </div>
 ) 
}
