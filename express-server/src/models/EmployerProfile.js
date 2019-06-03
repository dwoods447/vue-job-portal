//const Employer = require('../models/Employer');
module.exports = (sequelize, DataTypes) =>{
    const EmployerProfile = sequelize.define('Profile', {
          company: {
             type: DataTypes.STRING,
          },
          address:{
            type: DataTypes.STRING,
          },
          phone: {
            type: DataTypes.STRING,
          },
          webstie: {
            type: DataTypes.STRING,
          },
          logo: {
            type: DataTypes.STRING,
          },
          coverphoto: {
            type: DataTypes.STRING,
          },
          slogan: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.TEXT,
          },
          employerId: {
              type: DataTypes.INTEGER,
          }
    })

    EmployerProfile.associate = function(models){
        EmployerProfile.belongsTo(models.Employer)
    }

    return EmployerProfile;
}