module.exports = (sequelize, DataTypes) =>{
    const Favorite = sequelize.define('Favorite', {
          jobId: {
             type: DataTypes.INTEGER,
          },
          jobseekerId: {
                type: DataTypes.INTEGER,
          }
    })

    return Favorite;
}