const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const {UserService} = require('../services/user');
const _userService = new UserService();

exports.login = async (req, res) => {
    try {
        let user = await _userService.retrieveUser({email: req.body.email});

        if (await argon2.verify(user.password, req.body.password)) {
            let payload = {user};

            payload.token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '14400s'});

            res.send(payload);
        }
    } catch (e) {
        res.send({
            errorCode: 2,
            message: e.message,
        });
    }
};
