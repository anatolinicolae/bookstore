const {UserService} = require('../services/user');
const _userService = new UserService();

exports.index = async (req, res) => {
    const _user = await _userService.retrieveUser({
        id: req.user.id,
    });
    res.send(_user);
};
