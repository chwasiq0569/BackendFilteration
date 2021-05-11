const mongoose = require('mongoose')

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide name of the Bootcamp"],
        unique: true
    },
    rating: {
        type: Number,
        required: [true, "Please Provide rating for the Bootcamp"],
    },
    description: {
        type: String,
        required: [true, "Please Provide bootcamp with description"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Please Provide bootcamp with Price"],
        unique: true
    }
})
const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;