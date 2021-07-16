const ErrorHandler = require('../utils/errorHandler');
module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message =err.message || 'Internal server Error';
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errorMessage:err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}
        error.message = err.message
        if(err.name == 'CastError'){
            const message = `Resource not found.Invalid: ${err.path}`
            error= new ErrorHandler(message,400)
        }
        if(err.name == 'ValidationError'){
            const message = Object.values(err.erros).map(value=> value.message)
            error= new ErrorHandler(message,400)
        }
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error= new ErrorHandler(message,400)
        }
        if(err.name === 'JsonWebTokenError'){
            const message = 'JSON Web Token is invalid. Try Again !!!'
            error= new ErrorHandler(message,400)
        }
        if(err.code === 'TokenExpiredError'){
            const message = `JSON Web Token is Expired. Try Again !!!`
            error= new ErrorHandler(message,400)
        }
        res.status(error.statusCode).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })
    }
    
}