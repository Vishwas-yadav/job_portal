const { Schema, model, default: mongoose } = require("mongoose");
const employerSchema = Schema({
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
    organizationName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    website:{
        type:String
    },
    contact:{
        type:Number,
        require:true
    }
});

const employer = model("employer", employerSchema);
module.exports = employer;