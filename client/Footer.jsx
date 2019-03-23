import React, { useState, useReducer, useEffect } from 'react'

export default ({token}) => {
  return (
    <footer className="footer">
      <p id="token">
        {token ? "token: "  + token.substring(0, 13) + '...'
        : "footer text footer text footer text footer text footer text footer text"}
      </p>
      <p>all rights are dope yaaaah yeet</p>
    </footer>
  )
}