'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Propoint);
    }
  }
  Event.init({
    event: DataTypes.TEXT,
    participants: DataTypes.INTEGER,
    img: DataTypes.STRING,
    location: DataTypes.STRING,
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize
  });
  return Event;
};