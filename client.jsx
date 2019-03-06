import React, { useState, useReducer, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import './main.css'

document.addEventListener('DOMContentLoaded', () => {
  render (<Router />, document.getElementById('mount'))
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
  const [formData, setFormData] = useState({})

  useEffect(() => console.log('Only call me on mount please :)'), [])
  // useEffect(() => console.log('SOMETHING is changing!')) // any re-render (componentDidUpdate)
  // watch a particular piece of component state
  useEffect(() => console.log('props.token is changing!'), [token])
  useEffect(() => console.log('props.formData is changing!'), [formData])
  
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

// Q: can two components share state from the same reducer?
// A: no, each inits their own instance of the reducer. share logic, state still exclusive
// very contrived example
const ReducerTester = () => {
  return (
    <React.Fragment>
      <ReducerOne />
      <ReducerTwo />
    </React.Fragment>
  )
}

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