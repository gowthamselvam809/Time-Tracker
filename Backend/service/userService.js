var bcrypt = require('bcryptjs');
const { util } = require("../helper");
const { userRepository } = require("../repository");
const { formatErrorResponse } = require('../helper/util');

const register = async (request) => {
    const user = await userRepository.getUserByEmail(request.email);
    if (!util.isEmptyObject(user)) {
        throw util.formatErrorResponse("User already Exists.", 400);
    } else {
        const encryptedPassword = await bcrypt.hashSync(request.password, 10);
        const data = {
            ...request,
            email: request.email.toLowerCase(),
            password: encryptedPassword,
        };
        return await userRepository.createUser(data);
    }
}

const login = async (request) => {
    const { email, password } = request;
    console.log(request)
    let user = await userRepository.getUserByEmail(email);
    if (util.isEmptyObject(user)) {
        throw util.formatErrorResponse("User does not exist", 400);
    } else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            return user;
        }
        throw formatErrorResponse("Invalid Password", 400)
    }
}

module.exports = { register, login }