const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Event = sequelize.define( 'event' , {
        event : DataTypes.TEXT,
        partcipants : DataTypes.INTEGER,
        img : DataTypes.STRING,
        date : DataTypes.DATE 
    });
    return Event;
}