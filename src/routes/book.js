const BookController = require('../controllers/book');
const auth = require('../middleware/validate-token');
const canPublish = require('../middleware/can-publish');
const isOwner = require('../middleware/is-book-owner');

module.exports = router => {
    router.get('/index', BookController.index);
    router.get('/:id', BookController.show);

    // Book owner routes
    router.post('/create', auth, canPublish, BookController.create);
    router.post('/:id', auth, isOwner, BookController.update);
    router.delete('/:id', auth, isOwner, BookController.delete);
    router.patch('/:id/restore', auth, isOwner, BookController.restore);

    return router;
};
