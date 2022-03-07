const { DataTypes } = require('sequelize')
const DB = require('../db.config')

const Profile = DB.define('Profile', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    nom:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    user:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    prenom:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    }

}, { paranoid: true })           // Ici pour faire du softDelete

// Profile.sync()
// Profile.sync({force: true})
// Profile.sync({alter: true})

module.exports = Profile