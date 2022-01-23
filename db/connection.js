const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rahulmore:NriDkRwuYhoN4wyw@cluster0.rlosg.mongodb.net/twitter?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('Database connection Success!');
}).catch((err) => {
    console.log('Database connection faild!', err);
});