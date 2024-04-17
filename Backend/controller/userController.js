const { userService } = require("../service");


const userLogin = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await userService.login(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const userRegister = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await userService.register(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = { userRegister, userLogin }