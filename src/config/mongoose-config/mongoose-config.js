const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_CONNECTION_STR,
    { useNewUrlParser: true, useCreateIndex: true },
    (error) => {
        if (error) {
            console.log('could not connect to MongoDB');
        } else {
            console.log('connected to MongoDB');
        }
    }
);