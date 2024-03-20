const express = require('express')
const healthController = require('../controller/healthController')

const router = express.Router()

router.get('/',healthController)

module.exports = router