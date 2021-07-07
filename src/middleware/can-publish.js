module.exports = async (req, res, next) => {
    const {user} = req.user;

    // Proceed if current user not Darth Vader
    if ('darth vader' !== user.username.toLowerCase()) return next();

    return res.sendStatus(401);
};
