const fs = require('fs')
const path = require('path')
const https = require('https')

const CONF_PATH = path.join(__dirname, 'SECRETS.json')

const loadEnv = () => {
  if(fs.existsSync(CONF_PATH)) {
    const newKeys = JSON.parse(fs.readFileSync(CONF_PATH))
    process.env = {
      ...process.env,
      ...newKeys,
    }
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'
    console.log('added', newKeys, 'node_env:',process.env.NODE_ENV)
  } else {
    console.log('no SECRETS to load @', CONF_PATH)
  }
}

const initSecureServer = server => {
  const creds = {
    key: fs.readFileSync('/etc/letsencrypt/live/joevanbo.icu/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/joevanbo.icu/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/joevanbo.icu/chain.pem'),
  }
  https.createServer(creds, server).listen(443, (err) => {
    // dunno if this is legit
    if(err) {
      console.log('error, exiting', err)
      process.exit(1)
    }
    console.log('HTTPS server up on 443')
  })
}

module.exports = {
  loadEnv,
  initSecureServer
}