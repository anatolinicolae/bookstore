process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const should = chai.should();
const User = require('../src/models/User');
const {UserService} = require('../src/services/user');

chai.use(chaiHttp);

describe('Users', () => {
    const _userService = new UserService();
    let token;

    // Before testing we empty the database
    before(async () => {
        await User.deleteMany({});

        return await _userService.createUser({
            email: 'test@example.com',
            username: 'test',
            password: 'test',
            authorPseudonym: 'Test',
        });
    });

    /**
     * Test user authentication
     */
    describe('POST /auth/login', () => {
        it('it should authenticate with credentials and retrieve token', async () => {
            const res = await chai.request(server)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'test',
                });

            res.should.have.status(200);
            res.body.token.should.be.a('string');

            token = res.body.token;
        });
    });

    /**
     * Test user metadata retrieval
     */
    describe('GET /user/meta', () => {
        it('it should retrieve user metadata', async () => {
            const res = await chai.request(server)
                .get('/user/meta')
                .auth(token, {type: 'bearer'});

            res.should.have.status(200);
            res.body.username.should.be.a('string');
            res.body.username.should.be.eql('test');
        });
    });
});
