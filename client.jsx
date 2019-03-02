import React from 'react'
import { render } from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  render (<App />, document.getElementById('mount'))
})

const container = {
  margin: '5rem auto',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column'
}
const title = {marginBottom: '2px', textAlign: 'center'}
const subtitle = {marginBottom: '1rem', textAlign: 'center'}
const button = {width: '-moz-max-Content', maxWidth: 'fit-content', padding: '0.5rem 1.2rem', fontWeight: '500', fontSize: '16px', margin: '2rem auto', borderRadius: '5px', backgroundColor: 'rgb(120, 217, 110)'}
const input = {margin: '0 0 1rem 1rem', textAlign: 'center', height: '25px', fontSize: '16px', backgroundColor: '#f3f3bf', borderRadius: '100px'}
const label = {margin: '0', fontSize: '28px'}
const labels = {display: 'flex', flexDirection: 'column', margin: '0 10px 0 0', maxWidth: '80px'}
const inputs = {display: 'flex', flexDirection: 'column', margin: '0', width: '100%'}
const form = {display: 'flex', flexDirection: 'row', margin: '1rem'}
const footer = {position: 'absolute', bottom: '20px', textAlign: 'center', width: '100%', color: 'grey'}

const App = () => {
  return (
    <div>
      <div style={{...container}}>
        <h1 style={{...title}}>Welcome!</h1>
        <p style={{...subtitle}}><i>So glad you made it</i></p>
        <div style={{...form}}>
          <div style={{...labels}}>
            <label style={{...label}}>📧</label>
            <label style={{...label}}>🔑</label>
          </div>
          <div style={{...inputs}}>
            <input style={{...input}} type="email"/>
            <input style={{...input}} type="password"/>
          </div>
        </div>
        <button style={{...button}}>SUBMIT</button>
      </div>
      <footer style={{...footer}}>
        <p>footer text footer text footer text footer text footer text footer text</p>
        <p>all rights are dope yaaaah yeet</p>
      </footer>
    </div>
  )
}