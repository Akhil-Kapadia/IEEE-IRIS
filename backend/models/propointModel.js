const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const ProPoint = sequelize.define( 'propoint' , {
        points : DataTypes.INTEGER,
        confirmed : DataTypes.BOOLEAN,
        lab : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        description : DataTypes.STRING
    });
    return ProPoint;
}