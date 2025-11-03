const express = require('express')
const {fetchCandidates, registerCandidate} = require('../controllers/candidatesController')
const authorize = require('../middlewares/authorize')

const router = express.Router()

router.get('/candidates', authorize, fetchCandidates)
router.post('/candidates', registerCandidate)

module.exports = router;