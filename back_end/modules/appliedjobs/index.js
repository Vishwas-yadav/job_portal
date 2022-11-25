const {Router}=require("express");
const appliedJobsRouter = Router();
const authenticate=require('../../utilities/authentication/passport')().authenticate;
const {applyForJobCtrl,evaluateCandidateCtrl,getAppliedJobsByCandIdCtrl,getCandidateListForjobCtrl}=require('./controller');

appliedJobsRouter.post('/',authenticate(),applyForJobCtrl);
appliedJobsRouter.post('/evaluate',authenticate(),evaluateCandidateCtrl);

appliedJobsRouter.get('/getappliedjobs/:id',authenticate(),getAppliedJobsByCandIdCtrl);  //by candidate..
appliedJobsRouter.get('/getcandlistforjob/:id',authenticate(),getCandidateListForjobCtrl); //cand list for given jobid..
module.exports=appliedJobsRouter;