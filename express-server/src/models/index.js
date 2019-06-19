const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config.js')
const db = {}
const sequelize = new Sequelize(process.env.DATABASE_URL, config.db.database, config.db.user, config.db.password,{
    dialect: 'postgres'
})
fs.readdirSync(__dirname)
.filter((file)=>
    file !== 'index.js'
)
.forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

Object.keys(db).forEach(function(model){
    if ('associate' in db[model]) {
        db[model].associate(db)
    }
})
db.sequelize = sequelize;
db.Sequelize = Sequelize
module.exports = db