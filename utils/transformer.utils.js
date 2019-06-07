/**
 * @author Ajilore Raphael Olamide < reaphealolams@gmail.com >
 * Right reserved
*/


const Transformer = {};

Transformer.errorResponse = function errorResponse (status, code, message, field, type) {
  if (status) {
    return {
      error: {
        status,
        code,
        message, 
        field
      }
    }
  }

  else {
    return {
      error: {
        message,
        code,
        fbtrace_id: field,
        type
      }
    }
  }
}

Transformer.internalError = function internalError(error) {
  return {
    error
  }
}




module.exports = Transformer;
