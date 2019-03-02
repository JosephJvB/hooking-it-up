const router = require('express').Router()
const bcrypt = require('bcrypt')
// https://github.com/kelektiv/node.bcrypt.js/issues/16
// if bcrypt gives you grief, you just give em onna these: npm rebuild bcrypt --build-from-source
const jwt = require('jsonwebtoken')

// more rounds more secure - lol
const SALT_ROUNDS = 1

// not creating records yet - just send back a web-token
router.post('/register', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.not_a_password, SALT_ROUNDS)
    // is sync
    const token = jwt.sign({
      username: req.body.username,
      hash
    }, process.env.AUTH_SECRET, {expiresIn: '1d'})
    res.status(200).send(token)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router

// curl -X POST -H 'Content-Type:application/json' --data '{"username": "hi", "not_a_password": "stu"}' http://localhost:3000/api/auth/register