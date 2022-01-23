'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Propoint.belongsTo(models.User);
      Propoint.belongsTo(models.Event);
    }
  }
  Propoint.init({
    points: DataTypes.INTEGER
  }, {
    sequelize
  });
  return Propoint;
};