
module.exports = (sequelize, DataTypes) =>{
    const JobApplicants = sequelize.define('JobApplicants', {
          jobId: {
             type: DataTypes.INTEGER,
          },
          jobseekerId: {
                type: DataTypes.INTEGER,
          }
    })

    return JobApplicants;
}