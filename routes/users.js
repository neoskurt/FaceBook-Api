const express = require('express')
const userCtrl = require('../controllers/user')


let router = express.Router()


router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})


router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

router.post('/untrash/:id', userCtrl.untrashUser)

router.delete('/trash/:id', userCtrl.trashUser)
    
router.delete('/:id', userCtrl.deleteUser)

module.exports = router