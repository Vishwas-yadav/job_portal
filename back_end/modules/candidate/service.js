const candidate=require('./model');


const saveCandidateDetails=async(params)=>{
    try {
        let{
            loginId,
                name,
                email,
                address,
                contact,
                dob,
                fathersName,
                education,
                workExperience,
                skills,
                picture,
                resume
        }=params;
        const newCand=new candidate({
            loginId:loginId,
                name:name,
                email:email,
                address:address,
                contact:contact,
                dob:dob,
                fathersName:fathersName,
                education:education,
                workExperience:workExperience,
                skills:skills,
                picture:picture,
                resume:resume
        });
        await newCand.save((err, res) => {
            if (err) {
                throw err;
            }
        });
        return newCand._id;
    
    } catch (error) {
        console.log("Error in Saving Candidates Registration details:", error);
    throw error;
    }
}

const getCandidateListService=async()=>{
    try {
        let candList=await candidate.find({},{ __v: 0 });
    console.log("Candidate List:",candList);
    if (!candList.length){
        throw {
            br: true,
            msg: {
                err: "No Candidate List"
            }
        }
    }
    return{
        res: candList
    }
    } catch (error) {
        console.log("Error in get Candidate List:", error);
        throw error;
    }
}


const getCandidateDetailByIdService=async(params)=>{
    try {
        console.log("HERE::",params);
        let {id}=params;
        let cand=await candidate.findById(id);
        if(!cand){
            throw {
                br: true,
                msg: {
                    err: "No Candidate Found"
                }
            }
        }
        return{
            res:cand
        }
    } catch (error) {
        console.log("Error in getEmpDetailsByIdService:", error);
        throw error;
    }
}
module.exports={
    saveCandidateDetails,
    getCandidateListService,
    getCandidateDetailByIdService
}