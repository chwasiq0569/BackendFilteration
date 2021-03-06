require("dotenv").config();
const express = require('express')
const connectDB = require('./config/db');
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json())

connectDB();

app.use('/api/v1/bootcamps', require('./routes/bootcampRoutes'))

app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))