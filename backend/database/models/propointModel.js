const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const ProPoint = sequelize.define( 'propoint' , {
        points : DataTypes.INTEGER,
        confirmed : DataTypes.BOOLEAN,
        lab : DataTypes.INTEGER
    });
    return ProPoint;
}