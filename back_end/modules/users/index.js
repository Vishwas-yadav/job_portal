const {Router}=require("express");
const usersRouter = Router();
const { middleware: bodyParser } = require("bodymen");
const { middleware: queryParser } = require("querymen");
const authenticate=require('../../utilities/authentication/passport')().authenticate;

const {registerUserCtrl,loginUserCtrl,UpdateProfileCtrl}=require('./controller');

usersRouter.post('/register',bodyParser({}),registerUserCtrl);

usersRouter.post('/login', bodyParser({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}), loginUserCtrl);

usersRouter.post('/updateprofile',authenticate(),UpdateProfileCtrl);


module.exports=usersRouter;
