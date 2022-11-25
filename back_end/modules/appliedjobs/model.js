const { Schema, model, default: mongoose } = require("mongoose");
const appliedJobSchema = Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref: "jobs"
    },
    candId:{
        type:Schema.Types.ObjectId,
        ref: "candidates"
    },
    applicationStatus:{
        type:String
    }
});

const appliedjob = model("appliedjob", appliedJobSchema);
module.exports = appliedjob;