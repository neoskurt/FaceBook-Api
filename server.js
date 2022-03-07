const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')

let DB = require('./db.config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const user_router = require('./routes/users')
const profile_router = require('./routes/profiles')
const post_router = require('./routes/posts')
const auth_router = require('./routes/auth')


app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.use('/users', checkTokenMiddleware, user_router)
app.use('/profiles', profile_router)
app.use('/post', post_router)
app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))


DB.authenticate()
    .then(() => console.log('connexion ok'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`le serveur tourne sur le port ${process.env.SERVER_PORT}. let's go!`)
        })
    })
    .catch(err => console.log('Database Error', err))




