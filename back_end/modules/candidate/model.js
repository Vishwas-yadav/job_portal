const { Schema, model, default: mongoose } = require("mongoose");
const candidateSchema = Schema({
    email: {
        type: String,
        required: true
    },
    loginId:{
        type:Schema.Types.ObjectId,
        ref: "logins"
    },
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    fathersName:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    education:[{
        type:String
    }],
    workExperience:[{
        type:String
    }],
    skills:[{
        type:String
    }],
    picture:{
        type:String
    },
    resume:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:true
    }
});

const candidate = model("candidate", candidateSchema);
module.exports = candidate;