const { REGISTRATION_PARAMS_MISSING,JOB_POST_PARAMS_MISSING, EMAIL_ALREADY_EXISTS, REGISTERED_SUCCESS, USER_NOT_FOUND, LOGIN_SUCCESS, PASSWORD_INCORRECT, EMAIL_REQUIRED_ERR, EMAIL_NOT_FOUND_ERR, RESET_PASSWORD_LINK_SUCCESS } = require("../../utilities/response/messages");
const job = require("./model");

const postjobsService=async(params)=>{
try {
    let{jobtitle,empId,description,qualification,salary,joblocation,jobsector}=params;
    if(!jobtitle || !empId){
        throw {
            br: true,
            msg: {
                err: JOB_POST_PARAMS_MISSING
            }
        }
    }
    const newJob=new job({
        jobtitle:jobtitle,
        empId:empId,
        description:description,
        qualification:qualification,
        salary:salary,
        joblocation:joblocation,
        jobsector:jobsector
    })
    await newJob.save((err,res)=>{
        if(err)
        throw err;
    })
    return {
        msg:"Job Posted Successfully!"
    }
} catch (error) {
    console.log("Error in postjobsService:", error);
    throw error;
}
}


const getJobsByEmpIdService=async(params)=>{
try {
    console.log("PARAMS::",params);
    let {id}=params;
    let jobs=await job.find({empId:id});
    if(!jobs){
        throw {
            br: true,
            msg: {
                err: "No Job Found"
            }
        }
    }
    return {
        res:jobs
    };
} catch (error) {
    console.log("Error in getJobsByEmpIdService:", error);
    throw error;
}

}

const getAllJobsService=async()=>{
    try {
        let jobList=await job.find({},{ __v: 0 });
        if(!jobList){
            throw {
                br: true,
                msg: {
                    err: "No Job Found"
                }
            }
        }
        return{
            res:jobList
        }
    } catch (error) {
        console.log("Error in getAllJobsService:", error);
    throw error;
    }
}

const getjobdetailsService=async(params)=>{
try {
    console.log("PARAMS::",params);
    let {id}=params;
    let jobs=await job.findById(id);
    if(!jobs){
        throw {
            br: true,
            msg: {
                err: "No Job Found"
            }
        }
    }
    return {
        res: jobs
    }
} catch (error) {
    console.log("Error in getjobdetailsService:", error);
    throw error;
}
}



module.exports={
    postjobsService,
    getJobsByEmpIdService,
    getAllJobsService,
    getjobdetailsService
}