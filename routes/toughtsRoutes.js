const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtsController')
const checkAuth = require('../helpers/auth').checkAuth
// controller

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/', ToughtController.showToughts)
router.post('/remove', checkAuth ,ToughtController.removeTought)

module.exports = router
