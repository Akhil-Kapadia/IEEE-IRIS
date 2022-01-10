const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Event = sequelize.define( 'event' , {
        event : DataTypes.TEXT,
        participants : DataTypes.INTEGER,
        img : DataTypes.STRING,
        date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        } 
    });
    return Event;
}