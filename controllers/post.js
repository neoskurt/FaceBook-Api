const bcrypt = require('bcrypt')

const Post = require('../models/post')


exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then(posts => res.json({ data: posts }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getPost = async (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let post = await Post.findOne({ where: { id: postId }, raw: true })
        if (post === null) {
            return res.status(404).json({ message: 'This post does not exist !' })
        }

        return res.json({ data: post })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addPost = async (req, res) => {
    const { email, password } = req.body

    // Validation des données reçues
    if ( !email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        let post = await Post.findOne({ where: { email: email }, raw: true })
        if (post !== null) {
            return res.status(409).json({ message: `The post ${nom} already exists !` })
        }

        // Hashage du mot de passe utilisateur
        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        req.body.password = hash

        // Céation de l'utilisateur
        let Post = await Post.create(req.body)
        return res.json({ message: 'Post Created', data: post })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updatePost = async (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let post = await Post.findOne({ where: {id: postId}, raw: true})
        if(post === null){
            return res.status(404).json({ message: 'This post does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Post.update(req.body, { where: {id: postId}})
        return res.json({ message: 'Post Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashPost =  (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    Post.restore({ where: {id: postId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashPost = (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Post.destroy({ where: {id: postId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deletePost =  (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Post.destroy({ where: {id: postId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}