const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const{getCandidateListService,getCandidateDetailByIdService}=require('./service');

const getCandidateListCtrl=async(req,res)=>{
try {
    const result=await getCandidateListService();
    successResponse(res, result);
} catch (error) {
    if (error.br) {
        console.log("Known error in getCandidateListCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in getCandidateListCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

const getCandidateDetailByIdCtrl=async(req,res)=>{
    try {
        const result=await getCandidateDetailByIdService(req.params);
        successResponse(res, result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in getCandidateDetailByIdCtrl:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in getCandidateDetailByIdCtrl:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}

module.exports={
    getCandidateListCtrl,
    getCandidateDetailByIdCtrl
}