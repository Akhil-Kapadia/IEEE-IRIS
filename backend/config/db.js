// imports
const {Sequelize} = require('sequelize');
const bcrypt = require('bcryptjs');
const db_URI = process.env.DATABASE_URL || 'postgres://iris:password@localhost:5432/iris';


// db connection USER: iris PWRD: password PORT: 5432 DB: iris
const sequelize = new Sequelize(db_URI);

sequelize.authenticate().then(() => {
    console.log('Database initialized successfully!')
}) .catch(err =>  {
    console.error('Unable to connect to database', error);
});

const User = require('./database/models/userModel')(sequelize);  // table name = users
const Ieee = require('./database/models/ieeeModel')(sequelize);  // table name = ieee
const ProPoint = require('./database/models/propointModel')(sequelize);  //tbl name = propoints
const Event = require('./database/models/eventModel')(sequelize);    //tbl name = events

// Apply relations between tables
User.hasOne(Ieee);
Ieee.belongsTo(User);   // fk = userRId
User.hasMany(ProPoint);
ProPoint.belongsTo(User);   //fk = userRId
Event.hasMany(ProPoint);
ProPoint.belongsTo(Event);  //fk = eventsId

sequelize.sync().then(
    
);

// bcrypt.hash('password', 10, function(err, hash) {
//     User.create({
//         id : 12345678,
//         firstname : 'Test',
//         lastname :  'User',
//         email : 'test@gmail.com',
//         password : hash
//     });
// });



// export sequelize connection.
module.exports = {
    User,
    Ieee,
    ProPoint,
    Event,
    sequelize
};