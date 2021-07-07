const User = require('../models/User');

class UserService {
    async createUser(user) {
        const _user = new User(user);
        return _user.save();
    }

    async retrieveUser(query) {
        return User.findOne(query);
    }

    async updateUser(user) {
        const query = {
            _id: user._id,
        };
        return User.findOneAndUpdate(query, user);
    }

    async deleteUser(_id) {
        const query = {
            _id: _id,
        };
        return User.delete(query);
    }
}

module.exports = {
    UserService,
};
