const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('pensamentos-mvc nome do banco', 'user', 'key',{
    honst: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Banco de dados conectado!')
}catch(err){
    console.log(err)
}

module.exports = sequelize;