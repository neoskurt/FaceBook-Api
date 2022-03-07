const express = require('express')
const postCtrl = require('../controllers/post')


let router = express.Router()


router.use( (req, res, next) => {
    const event = new Date()
    console.log('Post Time:', event.toString())
    next()
})



router.get('/', postCtrl.getAllPosts)

router.get('/:id', postCtrl.getPost)

router.put('', postCtrl.addPost)

router.patch('/:id', postCtrl.updatePost)

router.post('/untrash/:id', postCtrl.untrashPost)

router.delete('/trash/:id', postCtrl.trashPost)
    
router.delete('/:id', postCtrl.deletePost)

module.exports = router