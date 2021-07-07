require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const xmlResponse = require('./middleware/xml-response');
const app = express();

// Read body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Apply Content-Type based response
app.use(xmlResponse);

// Load static assets
app.use(express.static('dist/public'));

// Register controllers
app.use('/auth', require('./routes/auth')(express.Router()));
app.use('/book', require('./routes/book')(express.Router()));
app.use('/user', require('./routes/user')(express.Router()));

// Connect to MongoDB Atlas
(async () => await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}))();

module.exports = app.listen(process.env.APP_PORT, () => {
    console.log(`App listening at http://localhost:${process.env.APP_PORT}`);
});
