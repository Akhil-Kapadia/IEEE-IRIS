const {DataTypes} = require('sequelize');

/**
 * Creates/Syncs a table called "users" that contain a R_id, firstname, lastname,
 * email, password, classification and alumni column.
 * @param {*} sequelize 
 */
module.exports = (sequelize) => {
    const User = sequelize.define( 'user' , {
        id : {
            type : DataTypes.INTEGER,
            allowNull: false,
            primaryKey : true
        },
        firstname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false
        },   
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            isEmail : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        classification : DataTypes.STRING,
        alumni : DataTypes.BOOLEAN,
        fullname : {
            type : DataTypes.VIRTUAL,
            get() {
                return `${this.firstname} ${this.lastname}`;
            }
        },
        role : DataTypes.VIRTUAL
    });
    return User;
}

