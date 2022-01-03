const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Ieee = sequelize.define( 'ieee' , {
        memberid : DataTypes.INTEGER,
        Officer : DataTypes.STRING,
        ferpa : DataTypes.STRING    // file path to picture of ferpa cert.
    },{
        freezeTableName : true
    });
    return Ieee;
}