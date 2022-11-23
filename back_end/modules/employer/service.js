const { REGISTRATION_PARAMS_MISSING, EMAIL_ALREADY_EXISTS, REGISTERED_SUCCESS, USER_NOT_FOUND, LOGIN_SUCCESS, PASSWORD_INCORRECT, EMAIL_REQUIRED_ERR, EMAIL_NOT_FOUND_ERR, RESET_PASSWORD_LINK_SUCCESS } = require("../../utilities/response/messages");
const employer=require('./model');


const saveEmployerDetails=async(params)=>{
try {
    let {loginId,
        name,
            email,
            organizationName,
            address,
            website,
            contact
    }=params;
    const newEmp=new employer({
        loginId:loginId,
        name:name,
        email:email,
        organizationName:organizationName,
        address:address,
        website:website,
        contact:contact
    });

    await newEmp.save((err, res) => {
        if (err) {
            throw err;
        }
    });
    



} catch (error) {
    console.log("Error in Saving Employers Registration details:", error);
    throw error;
}
}

const getEmployeeListService=async()=>{
try {
    let employerList=await employer.find({},{ __v: 0 });
    console.log("Employer List:",employerList);
    if (!employerList.length){
        throw {
            br: true,
            msg: {
                err: "No Employer List"
            }
        }
    }
    return{
        res: employerList
    }
} catch (error) {
    console.log("Error in get Employers List:", error);
    throw error;
}
}

const getEmpDetailsByIdService=async(params)=>{
try {
    console.log("HERE::",params);
    let {id}=params;
    let emp=await employer.findById(id);
    if(!emp){
        throw {
            br: true,
            msg: {
                err: "No Employer Found"
            }
        }
    }
    return {
        res:emp
    };
} catch (error) {
    console.log("Error in getEmpDetailsByIdService:", error);
    throw error;
}


}

module.exports={
    saveEmployerDetails,
    getEmployeeListService,
    getEmpDetailsByIdService
}