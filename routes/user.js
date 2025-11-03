const express = require('express')
const {fetchUsers, signUp, signIn} = require('../controllers/usersController')

const router = express.Router()




router.get('/users', fetchUsers)
router.post('/users', signUp)
router.post('/SignIn', signIn)

module.exports = router;