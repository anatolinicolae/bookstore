const {BookService} = require('../services/book');
const bookService = new BookService();

// Build book definition from request body
const buildBookDefinition = req => {
    let def = {
        title: req.body.title,
        description: req.body.description,
        price: {
            amount: req.body.amount,
        },
        author: req.user.user.id,
    };

    // Add currency if set
    if (req.body.currency) {
        def.currency = req.body.currency;
    }

    // Add cover when provided
    if (req.body.cover) {
        def.cover = req.body.cover;
    }

    return def;
};

// Retrieve all books and allow filtering via "q" param in querystring
exports.index = async (req, res) => {
    let books;

    if (req.query.q) {
        books = await bookService.retrieveBooks(req.query.q);
    } else {
        books = await bookService.retrieveBooks();
    }

    res.send({
        books,
        count: books.length || 0,
    });
};

// Retrieve a book given its ID
exports.show = async (req, res) => {
    try {
        const book = await bookService.retrieveBook(req.params.id);

        if (book) {
            res.send(book);
        } else {
            res.send({
                errorCode: 3,
                message: 'Something went wrong.',
            });
        }
    } catch (e) {
        res.send({
            errorCode: 1,
            message: 'Book not found',
        });
    }
};

// Retrieve a book given its ID
exports.create = async (req, res) => {
    try {
        let def = buildBookDefinition(req);

        const book = await bookService.createBook(def);

        res.send(book);
    } catch (e) {
        res.send({
            errorCode: 5,
            message: 'Could not create book',
        });
    }
};

// Retrieve a book given its ID
exports.update = async (req, res) => {
    try {
        let book = await bookService.retrieveBook(req.params.id);

        // Merge existing model with provided definition
        let def = Object.assign({}, book.toObject(),  buildBookDefinition(req));

        if (await bookService.updateBook(def)) {
            book = await bookService.retrieveBook(req.params.id);
            res.send(book);
        } else {
            res.send({
                errorCode: 6,
                message: 'Book could not be updated',
            });
        }
    } catch (e) {
        res.send({
            errorCode: 1,
            message: 'Book not found',
        });
    }
};

// Delete a book given its ID
exports.delete = async (req, res) => {
    try {
        const book = await bookService.deleteBook(req.params.id);

        if (book) {
            res.send({
                status: 200,
                message: 'Entity successfully deleted.',
            });
        } else {
            res.send({
                errorCode: 3,
                message: 'Something went wrong.',
            });
        }
    } catch (e) {
        res.send({
            errorCode: 1,
            message: 'Book not found',
        });
    }
};

// Restore a book given its ID
exports.restore = async (req, res) => {
    try {
        const book = await bookService.retrieveBook(req.params.id, true);
        await book.restore();
        res.send(book);
    } catch (e) {
        res.send({
            errorCode: 1,
            message: 'Book not found',
        });
    }
};
