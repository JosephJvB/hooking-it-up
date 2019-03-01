const fs = require('fs')
const path = require('path')

const CONF_PATH = path.join(__dirname, 'SECRETS.json')

const loadEnv = () => {
  if(fs.existsSync(CONF_PATH)) {
    process.env = Object.assign(
      {},
      process.env,
      JSON.parse(fs.readFileSync(CONF_PATH))
    )
  } else {
    console.log('no SECRETS to load @', CONF_PATH)
  }
}

module.exports = {
  loadEnv
}