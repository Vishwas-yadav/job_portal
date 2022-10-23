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
        
    
    } catch (error) {
        console.log("Error in Saving Candidates Registration details:", error);
    throw error;
    }
}

module.exports={
    saveCandidateDetails
}