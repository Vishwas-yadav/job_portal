const { REGISTRATION_PARAMS_MISSING,EMPLOYER_NOT_VERIFIED,ROLE_NOT_MATHCED, EMAIL_ALREADY_EXISTS, REGISTERED_SUCCESS, USER_NOT_FOUND, LOGIN_SUCCESS, PASSWORD_INCORRECT, EMAIL_REQUIRED_ERR, EMAIL_NOT_FOUND_ERR, RESET_PASSWORD_LINK_SUCCESS } = require("../../utilities/response/messages");
const login = require("./model");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcryptjs"));
const { getJwtToken } = require("../../utilities/authentication/token");
const {saveEmployerDetails}=require('../employer/service');
const {saveCandidateDetails}=require('../candidate/service');


const registerUserService = async(params)=>{
try {
    let {email,password,role,name,organizationName,address,website,contact,dob,fathersName,education,workExperience,
    skills,picture,resume}=params;



    if(role!='candidate' && role!='employer' && role!='admin'){
        throw{
            br:true,
            msg:{
                err: ROLE_NOT_MATHCED
            }
        }
    }

    if(role=='employer' && (!email || !password || !role || !name || !organizationName || !address || !contact)){
        throw {
            br: true,
            msg: {
                err: REGISTRATION_PARAMS_MISSING
            }
        }
    }

    if(role=='candidate' && (!email || !password || !role || !name || !address || !contact || !dob || !fathersName)){
        throw {
            br: true,
            msg: {
                err: REGISTRATION_PARAMS_MISSING
            }
        }
    }
    if(role=='admin' && (!email || !password || !role)){
        throw {
            br: true,
            msg: {
                err: REGISTRATION_PARAMS_MISSING
            }
        }
    }
    


    //check if email already registered..
    const user=await login.findOne({email:email});
    if(user){
        throw {
            br: true,
            msg: {
                err: EMAIL_ALREADY_EXISTS
            }
        }
    }
    const newUser = new login({
        email: email,
        password: password,
        role:role
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    console.log("New User obj:", newUser);
    await newUser.save((err, res) => {
        if (err) {
            throw err;
        }
    });
    let payload = {
        id: newUser._id,
        email: email,
        //isActive: newUser.isActive,
        //isVerified: newUser.isVerified,
        role:newUser.role
    };
    let jwtResult = await getJwtToken(payload);
        result = {
            res: jwtResult,
            msg: REGISTERED_SUCCESS
        };


        if(role=="employer"){
            //save to employer db...
            const newEmp={
                loginId:newUser._id,
                name:name,
                email:email,
                organizationName:organizationName,
                address:address,
                website:website,
                contact:contact
            }
            console.log("employers registration");
            await saveEmployerDetails(newEmp);

        }else if(role=="candidate"){
            const newCand={
                loginId:newUser._id,
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
            }
            await saveCandidateDetails(newCand);
            console.log("candidate registration..");
        }else{

            console.log("admin registration successful..");
        }
        return result;
} catch (error) {
    console.log("Error in Register User Service:", error);
    throw error;
}
}

const loginUserService = async (params) => {
    try {
        let result = {};
        let { email, password } = params;
        const user = await login.findOne({ email: email });
        if (!user) {
            throw {
                br: true,
                msg: {
                    err: USER_NOT_FOUND
                }
            }
        }
        console.log("USER OBJ::", user);
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            if(user.role=="employer" && user.isVerified==false){
                throw {
                    br: true,
                    msg: {
                        err: EMPLOYER_NOT_VERIFIED
                    }
                }
            }
            const payload = {
                id: user.id,
                email: user.email,
                //isActive: user.isActive,
                //isVerified: user.isVerified,
                role:user.role
            };
            console.log("PAYLOAD:", payload);
            let jwtResult = await getJwtToken(payload);
            result = {
                res: jwtResult,
                msg: LOGIN_SUCCESS
            };
            return result;
        } else {
            throw {
                br: true,
                msg: {
                    err: PASSWORD_INCORRECT
                }
            }
        }
    } catch (error) {
        console.log("Error in Login Service:", error);
        throw error;
    }
}

module.exports = {
    registerUserService,
    loginUserService
}