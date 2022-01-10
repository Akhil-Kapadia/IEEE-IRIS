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
        passport.use('jwt', new JWTstrategy({
            jwtFromRequest: cookieExtractor,
            secretOrKey : process.env.JWT_SECRET,
            jsonWebTokenOptions : {maxAge : '7d'}   // Auth ends after 7 days
        }, async function(jwtPayload, done) {
            const {sub, officer} = jwtPayload;

            const user = await User.findByPk(sub).catch(err => {
                return done(err, false);
            });

            if (user === null) {
                return done({msg : 'Unauthorized. Please Login'}, false);
            }

            return done(null, user);
        }));
};