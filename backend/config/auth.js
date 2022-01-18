const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('./db');
const JWTstrategy = passportJWT.Strategy;


const cookieExtractor = req => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    return token;
};


module.exports = (passport) => {
    console.error('process.env.JWT_SECRET');
        passport.use('jwt', new JWTstrategy({
            jwtFromRequest: cookieExtractor,
            secretOrKey : process.env.JWT_SECRET,
            jsonWebTokenOptions : {maxAge : '7d'}   // Auth ends after 7 days
        }, async function(jwtPayload, done) {
            const {id, officer} = jwtPayload;

            const user = await User.findByPk(id).catch(err => {
                return done(err, false);
            });

            if (user === null) {
                return done({msg : 'Unauthorized. Please Login'}, false);
            }

            user.role = officer || null;

            return done(null, user);
        }));
};