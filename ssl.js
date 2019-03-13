const router = require('express').Router()
const path = require('path')
const fs = require('fs')

// @ ~/.well-known/acme-challenge/{hash}
router.get(process.env.SSL_PATH, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'ssl-cert'))
})

module.exports = router