const {Router}=require("express");
const adminRouter = Router();
const { middleware: bodyParser } = require("bodymen");
const { middleware: queryParser } = require("querymen");
const {setEmpVerifiedCtrl,setCandVerifiedCtrl}=require('./controller');
const authenticate=require('../../utilities/authentication/passport')().authenticate;

adminRouter.post('/verify_emp',authenticate(),bodyParser({
emp_id:{
    type: String
},
setVerified:{
    type:Boolean
}
}),setEmpVerifiedCtrl);

adminRouter.post('/activate_cand',authenticate(),setCandVerifiedCtrl);



module.exports=adminRouter; 