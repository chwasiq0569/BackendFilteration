const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
    const error  = { ...err }

    error.message = err.message

    if(err.name === "CastError"){
        //CastError Occurs if requested id did not found or matched
        const message = "Resource not Found";
        error = new ErrorResponse(message, 404)
    }

    if(error.code === 11000){
        //if diplicate doc occurs (doc with same key)
        const message = "Duplicate Field Value Occured";
        error = new ErrorResponse(message, 400);
    }

    if(error.code === 'ValidationError'){
        //occures when any validation failed in model
        const message = Object.values(err.errors).map(error => error.message).join(", ")
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 5000).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler