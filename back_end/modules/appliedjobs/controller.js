const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const{applyForJobService,evaluateCandidateService,getAppliedJobsByCandIdService,getCandidateListForjobService}=require("./service")

const applyForJobCtrl=async(req,res)=>{
try {
    //post API..
    console.log("req:", req.body);
    const result=await applyForJobService(req.body);
    successResponse(res,result);
} catch (error) {
    if (error.br) {
        console.log("Known error in applyForJobCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in applyForJobCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

const evaluateCandidateCtrl=async(req,res)=>{
    try {
    console.log("req:", req.body);
    const result=await evaluateCandidateService(req.body);
    successResponse(res,result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in evaluateCandidateCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in evaluateCandidateCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

const getAppliedJobsByCandIdCtrl=async(req,res)=>{
    try {
        const result=await getAppliedJobsByCandIdService(req.params);
        successResponse(res, result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in getAppliedJobsByCandIdCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getAppliedJobsByCandIdCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

const getCandidateListForjobCtrl=async(req,res)=>{
    try {
        const result=await getCandidateListForjobService(req.params);
        successResponse(res,result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in getCandidateListForjobCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getCandidateListForjobCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

module.exports={
    applyForJobCtrl,
    evaluateCandidateCtrl,
    getAppliedJobsByCandIdCtrl,
    getCandidateListForjobCtrl
}