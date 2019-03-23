import React, { useState, useReducer, useEffect } from 'react'

export default ({svgClass, points}) => {
  return (
    <div className={svgClass}>
      <svg style={{position:'absolute',left:0, top: 0, height: '100vh', width: '100vw', zIndex: -1}}>
        {/* {hasCoords && <circle cx={coords.x} cy={coords.y} r={coords.r} stroke="red" strokeWidth="2" fill="none" />} */}
        <polygon points={points} stroke="#f45f42" strokeWidth="2" fill="#f45f42" />
      </svg>
    </div>
  )
}