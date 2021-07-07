const jwt = require('express-jwt');

module.exports = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});
