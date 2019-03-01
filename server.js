const app = require('fastify')({logger: false}) // logger too verbose D:
const path = require('path')

// do I really need to learn a new node server framework? yeeeet

async function init () {
  try {
    // register plugins
    await app.register(require('fastify-helmet')) // security
    await app.register(require('fastify-static'), { // serve assets from /dist
      root: path.join(__dirname, 'dist'),
      server: false
    })
    // register routes
    app.get('*', (req, res) => {
      res.sendFile('index.html')
    })
    // listen
    const port = await app.listen(process.env.PORT || 3000)
    console.log('listening on port:', port)
  } catch (err) {
    console.log('SERVER STOPPED AT ERROR:', err)
    // app.log.error(err)
    process.exit(1)
  }
}

init()