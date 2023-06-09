const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/pizza'

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

module.exports = mongoose;
