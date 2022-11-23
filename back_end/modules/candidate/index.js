const {Router}=require("express");
const candidateRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {getCandidateListCtrl,getCandidateDetailByIdCtrl}=require('./controller')
candidateRouter.get('/',authenticate(),getCandidateListCtrl);
candidateRouter.get('/:id',authenticate(),getCandidateDetailByIdCtrl);



module.exports=candidateRouter;