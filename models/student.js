'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.User);
      Student.belongsTo(models.Course, {
        foreignKey: {
          name: 'lab',
          allowNull: true
        }
      })
    }
  }
  Student.init({
    alumni: DataTypes.BOOLEAN,
    classification: DataTypes.STRING,
    lab: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'students',
    modelName: 'Student',
  });
  return Student;
};