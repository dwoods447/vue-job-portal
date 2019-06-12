const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt')) 
/**
 * Function that hashes the password
 * 
 */
function hashPassword(jobseeker){
    const SALT_FACTOR = 8;
   
    if(!jobseeker.changed('password')){
        return;
    }
    return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashSync(jobseeker.password, salt, null))
    .then(hash =>{
        jobseeker.setDataValue('password', hash)
    })
}
module.exports = (sequelize, DataTypes) =>{
    const Jobseeker  =  sequelize.define('Jobseeker', {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password:DataTypes.STRING
    },{
        hooks :{
            beforeSave: hashPassword
        }
    })

     Jobseeker.associate = function(models){
         Jobseeker.hasOne(models.JobseekerProfile)
        
     }

    Jobseeker.prototype.comparePassword = function(password){
        return bcrypt.compareAsync(password, this.password)
    }
    return Jobseeker;
}