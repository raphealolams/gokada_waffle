/**
* All right reserved
* @author Ajilore Raphael Olamide < raphealolams@gmail.com >
*/

const jwt = require('jsonwebtoken'); 

const Transformer = require('../utils/transformer.utils')
const ErrorResponse = Transformer.errorResponse

const Auth = {};


/**
 * @param {*} userDetails 
 * @author middleware function that sign's user details into jwt
 * @returns string
 */
Auth.generateAccessToken = function generateAccessToken(userDetails) {
  return jwt.sign(userDetails , process.env.SECRET, { expiresIn: process.env.EXPIRESIN})
};


/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @author middleware function that verifies user auth key
 * @returns insert customer object to the response object
 */
Auth.verifyToken = function verifyToken(req, res, next) {
  const bearer = req.headers['user-key'];
  const token = bearer ? bearer.split(' ')[1] : null
  if (!token) return res.status(401).json(ErrorResponse(401, "AUT_01", "Authorization code is empty.", "NoAuth")) 

  function verifyCallBack(error, decoded) {
    if (error) return res.status(401).json(ErrorResponse(401, "AUT_02", "Access Unauthorized", "NoAuth"))
    res.decoded = decoded
    return next();
  }

  return jwt.verify(token, process.env.SECRET, verifyCallBack);
};


module.exports = Auth;
