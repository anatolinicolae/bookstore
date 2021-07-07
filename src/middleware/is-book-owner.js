const {BookService} = require('../services/book');
const _bookService = new BookService();

module.exports = async (req, res, next) => {
    try {
        // Attempt to retrieve queried book
        const book = await _bookService.retrieveBook(req.params.id, true);
        const {user} = req.user;

        // Proceed if author matches current user
        if (book && book.author.id === user.id) return next();

        return res.sendStatus(401);
    } catch (e) {
        return res.status(401).send({
            errorCode: 4,
            message: 'Could not match author to current user',
        });
    }
};
