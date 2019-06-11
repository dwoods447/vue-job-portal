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

    return JobApplicant;
}