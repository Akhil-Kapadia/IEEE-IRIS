'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ieee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ieee.belongsTo(models.User);
    }
  }
  Ieee.init({
    memberId: DataTypes.INTEGER,
    officer: DataTypes.STRING,
    ferpa: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: 'Ieee'
  });
  return Ieee;
};