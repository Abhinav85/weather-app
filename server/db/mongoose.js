const mongoose = require('mongoose');
const url  = `mongodb://localhost:27017/`;

const dbName  = `weatherAppDb`;

mongoose.connect(url+dbName,{ useNewUrlParser: true });

module.exports = {mongoose}