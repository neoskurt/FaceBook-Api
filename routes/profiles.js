const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const profileCtrl = require('../controllers/profile')

let router = express.Router()


router.use( (req, res, next) => {
    const event = new Date()
    console.log('Profile Time:', event.toString())
    next()
})


router.get('', profileCtrl.getAllProfiles)

router.get('/:id', profileCtrl.getProfile)

router.put('', checkTokenMiddleware, profileCtrl.addProfile)

router.patch('/:id', checkTokenMiddleware, profileCtrl.updateProfile)

router.post('/untrash/:id', checkTokenMiddleware, profileCtrl.untrashProfile)
    
router.delete('/trash/:id', checkTokenMiddleware, profileCtrl.trashProfile)

router.delete('/:id', checkTokenMiddleware, profileCtrl.deleteProfile)

module.exports = router