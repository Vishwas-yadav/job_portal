const {Router}=require("express");
const jobsRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {postjobsCtrl,getJobsByEmpIdCtrl,getAllJobsCtrl,getjobdetailsCtrl}=require('./controller');
jobsRouter.post("/",authenticate(),postjobsCtrl);
jobsRouter.get("/getjobsbyempid/:id",authenticate(),getJobsByEmpIdCtrl);

jobsRouter.get("/getalljobs",authenticate(),getAllJobsCtrl);
jobsRouter.get("/getjobdetails/:id",authenticate(),getjobdetailsCtrl);


module.exports=jobsRouter;