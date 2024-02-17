const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/yourDatabase';

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB');
        db.close();
    }
});
