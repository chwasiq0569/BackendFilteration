const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
     mongoose.connect(process.env.DB_CONNECTION_STRING,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true }).then(() => {
        console.log("DB Connection Established");   
     }).catch(() => {
        console.log("Connection Failed");   
    })

}

module.exports = connectDB