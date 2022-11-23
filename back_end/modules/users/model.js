const { Schema, model } = require("mongoose");
const loginSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role:{
        type:String,
        require:true
        //candidate, employer, admin
    }
});
const login = model("login", loginSchema);
module.exports = login;