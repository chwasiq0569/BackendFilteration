const asyncHandler = require("../middlewares/asyncHandler")
const Bootcamp = require("../models/bootcamp")

exports.getAllBootcamps = async (req, res, next) => {

    const reqQuery = { ...req.query }

    const removeFields = ["sort"]
    
    removeFields.forEach(val => delete reqQuery[val])


    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
    
    const bootcamps = await Bootcamp.find(JSON.parse(queryStr))

    return res.status(200).json({
        success: true,
        data: bootcamps
    })
}

exports.createNewBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({
        success: true,
        data: bootcamp
    })
}

exports.updateBootcampById = async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`Bootcamp with ${req.params.id} not found`, 404))
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return res.status(201).json({
        success: true,
        data: bootcamp
    })
}

exports.deleteBootcampById = async (req, res, next) => {
    let bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
    // if(!bootcamp){
    //     return next(new ErrorResponse(`Bootcamp with ${req.params.id} not found`, 404))
    // }
    // await Bootcamp.remove();
    return res.status(200).json({
        success: true,
        data: {}
    })
}