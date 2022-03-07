const Profile = require('../models/profile')


exports.getAllProfiles = (req, res) => {
    Profile.findAll()
        .then(profiles => res.json({ data: profiles }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getProfile = async (req, res) => {
    let profileId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!profileId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du profile
        let profile = await Profile.findOne({ where: { idd: profileId }, raw: true })

        // Test si résultat
        if (profile === null) {
            return res.status(404).json({ message: 'This profile does not exist !' })
        }

        // Renvoi du Profile trouvé
        return res.json({ data: profile })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addProfile = async (req, res) => {
    const { user_id, nom, prenom,  } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !prenom ) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le coktail existe
        let profile = await Profile.findOne({ where: { nom: nom }, raw: true })
        if (profile !== null) {
            return res.status(409).json({ message: `The profile ${nom} already exists !` })
        }

        // Céation du profile
        profile = await Profile.create(req.body)
        return res.json({ message: 'Profile Created', data: profile })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateProfile = async (req, res) => {
    let profileId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!profileId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche du profile et vérification
        let profile = await Profile.findOne({ where: { id: profileId }, raw: true })
        if (profile === null) {
            return res.status(404).json({ message: 'This profile does not exist !' })
        }

        // Mise à jour du profile
        await Profile.update(req.body, { where: { id: profileId } })
        return res.json({ message: 'Profile Updated' })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.untrashProfile = (req, res) => {
    let profileId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!profileId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Profile.restore({ where: { id: profileId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashProfile = (req, res) => {
    let profileId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!profileId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du profile
    Profile.destroy({ where: { id: profileId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteProfile = (req, res) => {
    let profileId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!profileId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du profile
    Profile.destroy({ where: { id: profileId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}