const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt')) 

function hashPassword(employer){
    const SALT_FACTOR = 8;
    console.log('hashedPassword exexcuting\r\n\r\n')
    if(!employer.changed('password')){
        return;
    }
    return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashSync(employer.password, salt, null))
    .then(hash =>{
        employer.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) =>{
    const Employer  = sequelize.define('Employer', {
        company:{
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        representative: {
            type: DataTypes.STRING,
        },
        password:DataTypes.STRING

    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })

    Employer.associate = function(models){
        Employer.hasOne(models.EmployerProfile)
        Employer.hasMany(models.Job)
    }

    Employer.prototype.comparePassword = function(password){
        console.log('Comparing passwords\r\n\r\n')
        return bcrypt.compareAsync(password, this.password)
    }
  
    return Employer;
}