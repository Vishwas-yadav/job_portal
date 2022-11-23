const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const login=require("../../modules/users/model");
const {secretOrKey}=require("../../config");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey
};


const passportInit = () => {
    const strategy = new Strategy(opts, (jwtPayload, done) => {
        login.findById(jwtPayload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(err => {
                console.log("Error in passportInit:", err);
            });
    });
    passport.use(strategy);

    return {
        intialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", { session: false })
    };
};

module.exports = passportInit;

