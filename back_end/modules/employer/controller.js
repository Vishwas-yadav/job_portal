
const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const {getEmployeeListService,getEmpDetailsByIdService}=require('./service')

const getEmployeeListCtrl=async (req,res)=>{
try {
    const result=await getEmployeeListService();
    successResponse(res, result);
} catch (error) {
    if (error.br) {
        console.log("Known error in getEmployeeListCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in getEmployeeListCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

const getEmpDetailsByIdCtrl=async(req,res)=>{
try {
    console.log("query:::::::::::::::::::::::::::::::::::::::::::::::::::>>>>>>>>",req.params);
    const result=await getEmpDetailsByIdService(req.params);
    successResponse(res, result);
} catch (error) {
    if (error.br) {
        console.log("Known error in getEmpDetailsByIdCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in getEmpDetailsByIdCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}

}

module.exports={
    getEmployeeListCtrl,
    getEmpDetailsByIdCtrl
}