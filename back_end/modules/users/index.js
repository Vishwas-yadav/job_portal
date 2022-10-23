const {Router}=require("express");
const usersRouter = Router();
const { middleware: bodyParser } = require("bodymen");
const { middleware: queryParser } = require("querymen");

const {registerUserCtrl,loginUserCtrl}=require('./controller');

usersRouter.post('/register',bodyParser({}),registerUserCtrl);

usersRouter.post('/login', bodyParser({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}), loginUserCtrl);


module.exports=usersRouter;
