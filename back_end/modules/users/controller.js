const { successResponse, badRequest, internalServer } = require("../../utilities/response/index");
const { UNKNOWN_ERROR } = require("../../utilities/response/messages");
const {registerUserService,loginUserService}=require('./service');
const registerUserCtrl = async(req,res)=>{
try {
    console.log("req register:", req.body);
    const result=await registerUserService(req.body);
    successResponse(res,result);

} catch (error) {
    if (error.br) {
        console.log("Known error in Register User Controller:", JSON.stringify(error));
        badRequest(res, error.msg);
    } else {
        console.log("Unknown error in Register User Controller:", error);
        let errObj = {
            err: UNKNOWN_ERROR
        };
        internalServer(res, errObj);
    }
}
}

const loginUserCtrl = async (req, res) => {
    try {
        console.log("req login:", req.body);
        const result = await loginUserService(req.body);
        successResponse(res, result);
    } catch (error) {
        if (error.br) {
            console.log("Known error in Login User Controller:", JSON.stringify(error));
            badRequest(res, error.msg);
        } else {
            console.log("Unknown error in Login User Controller:", error);
            let errObj = {
                err: UNKNOWN_ERROR
            };
            internalServer(res, errObj);
        }
    }
}


module.exports = {
    registerUserCtrl,
    loginUserCtrl
}
