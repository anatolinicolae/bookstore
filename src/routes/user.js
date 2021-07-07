const UserController = require('../controllers/user');
const auth = require('../middleware/validate-token');

module.exports = router => {
    router.get('/meta', auth, UserController.index);

    return router;
};
