'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.ProPoint);
      Course.hasMany(models.Student, {
        foreignKey: 'lab'
      });
    }
  }
  Course.init({
    name: DataTypes.STRING,
    CourseId: DataTypes.INTEGER,
    section: DataTypes.INTEGER,
    dept: DataTypes.STRING,
    semester: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses'
  });
  return Course;
};