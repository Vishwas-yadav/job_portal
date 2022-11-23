const {Router}=require("express");
const employerRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {getEmployeeListCtrl,getEmpDetailsByIdCtrl}=require('./controller');

employerRouter.get('/',authenticate(),getEmployeeListCtrl);
employerRouter.get('/:id',authenticate(),getEmpDetailsByIdCtrl);

module.exports=employerRouter;
