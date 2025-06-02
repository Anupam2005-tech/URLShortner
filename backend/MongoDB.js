const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function mongoDBconnect(url) {
    try {

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: 'majority'
        };
        
        return await mongoose.connect(url, options);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = {
    mongoDBconnect
};