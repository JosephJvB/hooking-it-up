const fs = require('fs')
const path = require('path')

const CONF_PATH = path.join(__dirname, 'SECRETS.json')

const loadEnv = () => {
  if(fs.existsSync(CONF_PATH)) {
    const newKeys = JSON.parse(fs.readFileSync(CONF_PATH))
    process.env = {
      ...process.env,
      ...newKeys,
      NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
    }
    console.log('added', newKeys, 'node_env:',process.env.NODE_ENV)
  } else {
    console.log('no SECRETS to load @', CONF_PATH)
  }
}

module.exports = {
  loadEnv
}