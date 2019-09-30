// establishing connection to mongodb database 
const mongoose = require('mongoose');
console.log('url', process.env.MONGODB_URI);

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection established successfully !');
    }
    else {
        console.log('MongoDB Connection failed !' + JSON.stringify(err, undefined, 2));
    }
});