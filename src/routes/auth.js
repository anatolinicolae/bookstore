const AuthController = require('../controllers/auth');

module.exports = router => {
    router.post('/login', AuthController.login);

    return router;
};
