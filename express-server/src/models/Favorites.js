
module.exports = (sequelize, DataTypes) =>{
    const Favorites = sequelize.define('Favorites', {
          jobId: {
             type: DataTypes.INTEGER,
          },
          jobseekerId: {
                type: DataTypes.INTEGER,
          }
    })

    return Favorites;
}