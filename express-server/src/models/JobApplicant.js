module.exports = (sequelize, DataTypes) =>{
    const JobApplicant = sequelize.define('JobApplicant', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
          JobId: {
             type: DataTypes.INTEGER,
          },
          JobseekerId: {
                type: DataTypes.INTEGER,
      }
    })

    JobApplicant.associate = function(models){
      JobApplicant.belongsToMany(models.Job, {through: JobApplicant})
      JobApplicant.belongsToMany(models.Jobseeker, {through: JobApplicant})
  }

    return JobApplicant;
}	  