const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function mongoDBconnect(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 120000, 
  });
}

module.exports = {
  mongoDBconnect
};
