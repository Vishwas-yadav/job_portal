
const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const {setEmpVerifiedService}=require('./service');
const setEmpVerifiedCtrl=async (req,res)=>{
try {
    console.log("req set emp verify:",req.body);
    const result=await setEmpVerifiedService(req.body);
    successResponse(res, result);
} catch (error) {
    if (error.br) {
        console.log("Known error in setEmpVerifiedCtrl:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in setEmpVerifiedCtrl:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}

}

module.exports={
    setEmpVerifiedCtrl
}