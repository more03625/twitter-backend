const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rlosg.mongodb.net/twitter?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection Success!');
}).catch((err) => {
    console.log('Database connection faild!', err);
});