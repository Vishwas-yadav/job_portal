const appliedjob=require('./model');
const job=require('../jobs/model');
const candidate=require('../candidate/model');

const applyForJobService=async(params)=>{
    try {
        let {candId,jobId,applicationStatus}=params;
        if(!candId||!jobId){
            throw {
                br: true,
                msg: {
                    err: "Some params missing in apllying jobs"
                }
            }
        }
        let foundold= await appliedjob.find({jobId:jobId,candId:candId});
        if(foundold.length!=0){
            throw{
                br:true,
                msg:{
                    err:"You have Allready Applied to this job!"
                }
            }
        }
        const newApp=new appliedjob({
            candId:candId,
            jobId:jobId,
            applicationStatus:applicationStatus
        })
        await newApp.save((err,res)=>{
            if(err){
                throw err;
            }
        });
        return {
            msg:"Application Applied Successfully!"
        }
    } catch (error) {
        console.log("Error in applyForJobService:", error);
    throw error;
    }
}

const evaluateCandidateService=async(params)=>{
    try {
        let {candId,jobId,applicationStatus}=params;
        if(!candId||!jobId){
            throw {
                br: true,
                msg: {
                    err: "Some params missing in evaluating the candidate!"
                }
            }
        }
        let foundold= await appliedjob.find({jobId:jobId,candId:candId});
        if(!foundold){
            throw{
                br:true,
                msg:{
                    err:"No Applied jobs found!"
                }
            }
        }
        let updated=await appliedjob.findOneAndUpdate({jobId:jobId,candId:candId},{applicationStatus:applicationStatus});
        return{
            msg:"Evaluation status updated successfully!"
        }
    } catch (error) {
        console.log("Error in evaluateCandidateService:", error);
    throw error;
    }
}

const getAppliedJobsByCandIdService=async(params)=>{
try {
    let {id}=params;
    //console.log("here:::",id);
    const appliedList=await appliedjob.find({candId:id});
    const finalRes=[];
    for(const fn of appliedList){
        const finalList=await job.findById(fn.jobId);
        finalRes.push(finalList);
        //console.log("insoide::",finalRes);
    }
    //console.log("finalRes::",finalRes);
    return{
        res: finalRes
    }
} catch (error) {
    console.log("Error in getAppliedJobsByCandIdService:", error);
    throw error;
}
}


const getCandidateListForjobService=async(params)=>{
    try {
        let {id}=params;
    const appliedList=await appliedjob.find({jobId:id});
    const finalRes=[];
    for(const fn of appliedList){
        let finalList=await candidate.findById(fn.candId);
        finalRes.push(finalList);
    }
    return{
        res: finalRes
    }
    } catch (error) {
        console.log("Error in getCandidateListForjobService:", error);
        throw error;
    }
}

module.exports={
    applyForJobService,
    evaluateCandidateService,
    getAppliedJobsByCandIdService,
    getCandidateListForjobService
}