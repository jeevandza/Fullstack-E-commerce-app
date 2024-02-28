

const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
   }
   
class BaseError extends Error {
    constructor (name, statusCode, isOperational, description) {
    super(description)
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this)
    }
   }


   class Api404Error extends BaseError {
    constructor (
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
    ) {
    super(name, statusCode, isOperational, description)
    }
   }
   
   module.exports = BaseError

