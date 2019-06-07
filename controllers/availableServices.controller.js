/**
 * @author Ajilore Raphael Olamide <raphealolams@yahoo.com raphealolams@gmail.com>
 * @author Everything about Available Services
*/

const BankServices = require('../service')
const AvailableServices = {};


AvailableServices.getAvailableServices = async function getAvailableServices(req, res, next) {
    try {
        const { decoded } = res;

        if (decoded && decoded.validated) {



        }

        return res.status(400).json().end()

    } catch (error) {
        console.error(error)
        next(error)
    }
};



module.exports = AvailableServices;