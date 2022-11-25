const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const {postjobsService,getJobsByEmpIdService,getAllJobsService,getjobdetailsService}=require('./service')



const postjobsCtrl=async(req,res)=>{
try {
    console.log("req:", req.body);
    const result=await postjobsService(req.body);
    successResponse(res,result);
} catch (error) {
    if (error.br) {
        console.log("Known error in postjobsCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in postjobsCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}
const getJobsByEmpIdCtrl=async(req,res)=>{
try {
    console.log("query::",req.params);
    let result=await getJobsByEmpIdService(req.params);
    successResponse(res,result);
} catch (error) {
    if (error.br) {
        console.log("Known error in getJobsByEmpIdCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in getJobsByEmpIdCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

const getAllJobsCtrl=async(req,res)=>{
    try {
        let result=await getAllJobsService();
        successResponse(res,result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in getAllJobsCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getAllJobsCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

const getjobdetailsCtrl=async(req,res)=>{
try {
    console.log("query::",req.params);
    let result=await getjobdetailsService(req.params);
    successResponse(res,result);
} catch (error) {
    if (error.br) {
        console.log("Known error in getjobdetailsCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in getjobdetailsCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

module.exports={
    postjobsCtrl,
    getJobsByEmpIdCtrl,
    getAllJobsCtrl,
    getjobdetailsCtrl,
    getjobdetailsCtrl
}