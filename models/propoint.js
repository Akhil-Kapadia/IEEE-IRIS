'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProPoint.belongsTo(models.User);
      ProPoint.belongsTo(models.Event);
    }
  }
  ProPoint.init({
    points: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    courseId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize
  });
  return ProPoint;
};