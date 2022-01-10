// imports
const {Sequelize} = require('sequelize');
const bcrypt = require('bcryptjs');
const db_URI = process.env.DATABASE_URL;


// db connection USER: iris PWRD: password PORT: 5432 DB: iris
const sequelize = new Sequelize(db_URI);

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

sequelize.sync({force : true})
    .then( () => {
        bcrypt.hash('password', 10, function(err, hash) {
        User.create({
            id:12345678,
            password : hash,
            firstname:'Test',
            lastname:'user',
            email:'test@abc.def',
            classification : 'EE',
            alumni : true
        }).then(async function (user){
            await user.setIeee(await Ieee.create({
                memberId : 123,
                officer : 'Admin',
                ferpa : true
            }));
        });
    });
});




// export sequelize connection.
module.exports = {
    User,
    Ieee,
    ProPoint,
    Event,
    sequelize
};