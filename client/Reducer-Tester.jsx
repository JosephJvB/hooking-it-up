import React, { useState, useReducer, useEffect } from 'react'

export default () => {
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