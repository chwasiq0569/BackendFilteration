require("dotenv").config();
const express = require('express')
const connectDB = require('./config/db')

const app = express();
connectDB();

app.use('/api/v1/bootcamps', require('./routes/bootcampRoutes'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))