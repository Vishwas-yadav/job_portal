const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../config");

const getJwtToken = async (payload, expTime) => {
    try {
        let tokenExpireTime = expTime ? expTime : "1d";
        console.log("PAYLOAD for token:", payload, tokenExpireTime);
        let token = await jwt.sign(payload, secretOrKey, { expiresIn: tokenExpireTime });
        if (!token) {
            throw 'token not generated!'
        }
        return `${token}`;
    } catch (error) {
        console.log("Error in getJwtToken", error);
        throw error;
    }
}



module.exports = {
    getJwtToken
}