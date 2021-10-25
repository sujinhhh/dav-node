const express = require('express')
const router = express.Router()
const resisterController = require('../controllers/resisterController')

router.post('/',resisterController.handleNewUser)

module.exports = router;