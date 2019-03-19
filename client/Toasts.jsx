import React, { useState, useReducer, useEffect } from 'react'

export default ({setToast, toasts}) => {
  const getTop = i => i * 55 + 5 * (i + 1) + 'px'

  const rmToast = i => { // remove toast by index on click
    const next = [...toasts]
    next.splice(i, 1)
    setToast([...next])
  }

  return toasts.map((t, i) => (
    <div key={i} style={{top: getTop(i)}} className="toast">
      <p>Hey I am a useful message alert {t}</p>
      <p id="x" onClick={() => rmToast(i)}>❌</p>
    </div>
  ))
}