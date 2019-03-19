import React, { useState, useReducer, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './Home.jsx'
import ReducerTester from './Reducer-Tester.jsx'

import '../main.css' // import css so webpack will inject .css contents into <head><style> tag

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/test' component={ReducerTester}/>
        <Route component={() => <h1>BROKEN</h1>} /> 
      </Switch>
    </BrowserRouter>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Router />, document.getElementById('mount'))
})