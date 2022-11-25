const { Schema, model, default: mongoose } = require("mongoose");
const jobsSchema = Schema({
    jobtitle: {
        type: String,
        required: true
    },
    empId:{
        type:Schema.Types.ObjectId,
        ref: "employers"
    },
    description:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    salary:{
        type:String,
        require:true
    },
    joblocation:{
        type:String
    },
    jobsector:{
        type:String,
        require:true
    }
});

const job = model("job", jobsSchema);
module.exports = job;