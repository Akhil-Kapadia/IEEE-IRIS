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
            jsonWebTokenOptions : {maxAge : '7d'}
        }, async function(jwtPayload, done) {
            const {sub, officer, exp} = jwtPayload;

            const user = await User.findByPk(sub).catch(err => {
                return done(err, false);
            });

            if (Date.now() > exp) {
                return done('Unauthorized', false);
            }

            if (user === null) {
                return done('Unauthorized', false);
            }

            if (officer === null) {
                return done(null, {user : user, role : 'user'});
            }

            return done(null, {user : user, role : 'admin'});
        }));
};