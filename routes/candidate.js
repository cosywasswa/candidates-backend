const express = require('express')
const {fetchCandidates, registerCandidate, getCandidate} = require('../controllers/candidatesController')
const authorize = require('../middlewares/authorize')

const router = express.Router()

router.get('/candidates', authorize, fetchCandidates)
router.post('/candidates', registerCandidate)
router.get('/candidates/:_id', getCandidate)

module.exports = router;