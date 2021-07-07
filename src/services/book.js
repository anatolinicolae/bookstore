const Book = require('../models/Book');

class BookService {
    async createBook(book) {
        const _book = new Book(book);
        return _book.save();
    }

    async retrieveBook(id, withDeleted = false) {
        const query = {
            _id: id,
        };

        let book;

        if (withDeleted) {
            book = Book.findOneWithDeleted(query);
        } else {
            book = Book.findOne(query);
        }

        return book.populate({
            path: 'author',
            model: 'User',
        });
    }

    async retrieveBooks(terms, withDeleted = false) {
        let books, query = {};

        if (typeof terms !== 'undefined' && terms !== null) {
            query.title = {$regex: '.*' + terms + '.*'};
        }

        if (withDeleted) {
            books = Book.findWithDeleted(query);
        } else {
            books = Book.find(query);
        }

        return books.populate({
            path: 'author',
            model: 'User',
        });
    }

    async updateBook(book) {
        const query = {
            _id: book._id,
        };
        return Book.findOneAndUpdate(query, book);
    }

    async deleteBook(_id) {
        const query = {
            _id: _id,
        };
        return Book.delete(query);
    }
}

module.exports = {
    BookService,
};
