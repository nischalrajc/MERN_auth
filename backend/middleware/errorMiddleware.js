
const notfound = (req,res,next) =>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next)=>{
    let stausCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'objectId'){
        statusCode = 404;
        message = 'Resource not found'
    }

    res.status(stausCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}


export {notfound,errorHandler}