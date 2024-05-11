const JWT = require("jsonwebtoken")

const genAuthToken = (user)=>{
    const secretkey = process.env.JWT_SECRET_KEY;
    const token = JWT.sign({
        _id:user.id,
        name:user.name,
        email:user.email,
    },secretkey);

    return token;
}

module.exports = genAuthToken;