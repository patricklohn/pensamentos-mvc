const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define('User',{
    code:{
        type: DataTypes.INTEGER,
        unique: true, 
        allowNull: false,
        autoIncrement: true, 
        unique:true,
    },
    name:{
        type: DataTypes.STRING,
        require: true,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
    },
    senha:{
        type: DataTypes.STRING,
        require: true,
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true,
    },
})

module.exports = User;