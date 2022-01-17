// imports
const {Sequelize} = require('sequelize');
const bcrypt = require('bcryptjs');


// db connection USER: iris PWRD: password PORT: 5432 DB: iris
const sequelize = new Sequelize(
    process.env.PG_DBNAME,
    process.env.PG_DBUSER,
    process.env.PG_DBPASS,
    {
        host : process.env.PG_DBHOST,
        port : process.env.PG_DBPORT,
        dialect : 'postgres'
    } );

sequelize.authenticate().then(() => {
    console.log('Database initialized successfully!')
}) .catch(err =>  {
    console.error('Unable to connect to database\n', err);
});

const User = require('../models/userModel')(sequelize);  // table name = users
const Ieee = require('../models/ieeeModel')(sequelize);  // table name = ieee
const ProPoint = require('../models/propointModel')(sequelize);  //tbl name = propoints
const Event = require('../models/eventModel')(sequelize);    //tbl name = events

// Apply relations between tables
User.hasOne(Ieee);
Ieee.belongsTo(User);   // fk = userRId
User.hasMany(ProPoint);
ProPoint.belongsTo(User);   //fk = userRId
Event.hasMany(ProPoint);
ProPoint.belongsTo(Event);  //fk = eventsId

sequelize.sync()
    .then( () => {
    try {
        bcrypt.hash('zqP$sGf5', 10, function(err, hash) {
        User.create({
            id:10000000,
            password : hash,
            firstname:'Admin',
            lastname:'Iris',
            email:'ieee@ttu.edu',
            classification : 'EE',
            alumni : true
        }).then(async function (user){
            await user.setIeee(await Ieee.create({
                memberId : 1,
                officer : 'Admin',
                ferpa : true
            }));
        });
        });
    }catch(err){
    }
});




// export sequelize connection.
module.exports = {
    User,
    Ieee,
    ProPoint,
    Event,
    sequelize
};