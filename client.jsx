import React from 'react'
import { render } from 'react-dom'

const testProps = {
  jsx: 'jsx!!'
}

document.addEventListener('DOMContentLoaded', () => {
  render (<App {...testProps}/>, document.getElementById('mount'))
})

const App = (props) => {
  return (
    <div>
      <h1>hey im a thing!</h1>
      <p>im {props.jsx}</p>
    </div>
  )
}