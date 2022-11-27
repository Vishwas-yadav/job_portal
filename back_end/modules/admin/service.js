const { REGISTRATION_PARAMS_MISSING,SOME_PARAMS_MISSING,EMPLOYER_NOT_VERIFIED,ROLE_NOT_MATHCED, EMAIL_ALREADY_EXISTS, REGISTERED_SUCCESS, USER_NOT_FOUND, LOGIN_SUCCESS, PASSWORD_INCORRECT, EMAIL_REQUIRED_ERR, EMAIL_NOT_FOUND_ERR, RESET_PASSWORD_LINK_SUCCESS } = require("../../utilities/response/messages");
//const login = require("../users/model");
const employer=require("../employer/model");
const setEmpVerifiedService=async (params)=>{
try {
    let {emp_id,setVerified}=params;
    if(!emp_id){
        throw {
            br: true,
            msg: {
                err: SOME_PARAMS_MISSING
            }
        }
    }
    let filter={
        loginId:emp_id
    };
    const user=await employer.findOneAndUpdate(filter,{isVerified:setVerified});
    if(!user){
        throw {
            br: true,
            msg: {
                err: USER_NOT_FOUND
            }
        }
    }
    console.log("User found::", user);
    let result={
        msg:"Employer Access Updated successfully!"
    }
    return result;
} catch (error) {
    console.log("Error in 'Setting Employee as Verified' Service:", error);
    throw error;
}
}

module.exports={
    setEmpVerifiedService
}