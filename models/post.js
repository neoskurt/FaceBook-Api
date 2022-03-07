const { DataTypes } = require('sequelize')
const DB = require('../db.config')

const Post = DB.define('Post', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    authorId:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    }, 
    author:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    message:{
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
    },
    
}, { paranoid: true })           // Ici pour faire du softDelete

// Post.sync()
// Post.sync({force: true})
// Post.sync({alter: true})

module.exports = Post