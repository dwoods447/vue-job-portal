
module.exports = (sequelize, DataTypes) =>{
    const JobCategories = sequelize.define('JobCategories', {
          name: {
             type: DataTypes.STRING,
          }
    })

    return JobCategories;
}