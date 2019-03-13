const express = require('express')
const helmet = require('helmet')
const path = require('path')
const AuthRouter = require('./auth')
require('./util').loadEnv()

const PORT = process.env.PORT || 3000

const server = express()
server.use(helmet())
server.use(express.static(path.join(__dirname, 'dist'), {/*dotfiles: 'allow'*/})) // couldnt get dotfiles through no matter what!
server.use(express.json())

if(process.env.NODE_ENV === 'production') {
  // open https server and register route to respond to ssl challenge
  initSecureServer(server)
  server.use('/.well-known/acme-challenge', require('./ssl')) // load ssl router after loading vars onto process.env
}
server.use('/api/auth', AuthRouter)
server.get('*', (req, res, next) => res.sendFile(path.join(__dirname, 'dist/index.html')))

const expressServer = server.listen(PORT, console.log('server up @', PORT))

process.on('uncaughtException', (err) => {
  console.log('Closing server on error', err)
  expressServer.close(() => process.exit(1))
})