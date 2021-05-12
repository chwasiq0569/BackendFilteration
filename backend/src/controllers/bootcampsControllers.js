const asyncHandler = require("../middlewares/asyncHandler")
const Bootcamp = require("../models/bootcamp")

exports.getAllBootcamps = async (req, res, next) => {
    let query;

    let uiValues = {
        filtering: {},
        sorting: {}
    }

    const reqQuery = { ...req.query }
    const removeFields = ["sort"]
    removeFields.forEach(val => delete reqQuery[val])

    const filterKeys = Object.keys(reqQuery)
    const filterValues= Object.values(reqQuery)

    filterKeys.forEach((val, idx) => uiValues.filtering[val] = filterValues[idx])

    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
    query = Bootcamp.find(JSON.parse(queryStr))
    if(req.query.sort){
        const sortbyArr = req.query.sort.split(',')

        sortbyArr.forEach(val => {
            let order;

            if(val[0] === '-'){
                order = "descending"
            }else{
                order = "asscending"
            }
            uiValues.sorting[val.replace("-", "")] = order
        })

        const sortByStr = sortbyArr.join(" ");
        query = query.sort(sortByStr)
    }else{
        query = query.sort('-price')
    }
    const bootcamps = await query

    const maxPrice = await Bootcamp.find().sort({ price: -1 }).limit(1).select("-_id price");

    const minPrice = await Bootcamp.find().sort({ price: 1 }).limit(1).select("-_id price");

    uiValues.maxPrice = maxPrice[0].price
    uiValues.minPrice = minPrice[0].price

    return res.status(200).json({
        success: true,
        data: bootcamps,
        uiValues
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
    await Bootcamp.findByIdAndRemove(req.params.id);
    return res.status(200).json({
        success: true,
        data: {}
    })
}