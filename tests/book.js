// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let Book = require('../src/models/Book');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
    let token;
    let book;

    // Before testing we empty the database
    before(async () => {
        await Book.deleteMany({});

        let res = await chai.request(server)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'test',
            });

        token = res.body.token;
    });

    /**
     * Test book creation
     */
    describe('POST /book/create', () => {
        it('it should create a new book', async () => {
            const res = await chai.request(server)
                .post('/book/create')
                .send({
                    title: 'test',
                    description: 'test',
                    amount: 123,
                    cover: 'https://www.collinsdictionary.com/images/thumb/book_181404689_250.jpg',
                })
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.title.should.be.eql('test');
            res.body.description.should.be.eql('test');
            res.body.price.amount.should.be.eql(123);

            book = res.body.id;
        });
    });

    /**
     * Test book index retrieval
     */
    describe('GET /book/index', () => {
        it('it should retrieve all the books', async () => {
            const res = await chai.request(server)
                .get('/book/index')
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.books.should.be.a('array');
            res.body.count.should.be.eql(1);
        });
    });

    /**
     * Test book detail retrieval
     */
    describe('GET /book/:id', () => {
        it('it should retrieve a specific book', async () => {
            const res = await chai.request(server)
                .get(`/book/${book}`)
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.title.should.be.eql('test');
            res.body.description.should.be.eql('test');
            res.body.price.amount.should.be.eql(123);
        });
    });

    /**
     * Test book update
     */
    describe('POST /book/:id', () => {
        it('it should update a specific book', async () => {
            const res = await chai.request(server)
                .post(`/book/${book}`)
                .send({
                    title: 'test',
                    description: 'test edited',
                    amount: 123,
                    cover: 'https://www.collinsdictionary.com/images/thumb/book_181404689_250.jpg',
                })
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.title.should.be.eql('test');
            res.body.description.should.be.eql('test edited');
            res.body.price.amount.should.be.eql(123);
        });
    });

    /**
     * Test book deletion
     */
    describe('DELETE /book/:id', () => {
        it('it should delete a specific book', async () => {
            const res = await chai.request(server)
                .delete(`/book/${book}`)
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.message.should.be.eql('Entity successfully deleted.');
        });
    });

    /**
     * Test book restore
     */
    describe('PATCH /book/:id/restore', () => {
        it('it should restore a specific book', async () => {
            const res = await chai.request(server)
                .patch(`/book/${book}/restore`)
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.title.should.be.eql('test');
            res.body.description.should.be.eql('test edited');
            res.body.price.amount.should.be.eql(123);
        });
    });
});
