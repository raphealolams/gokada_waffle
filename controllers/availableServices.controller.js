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
            let array = [];
            let services = await BankServices.getServices()
            

            services.map((service, index) => {
                return array.push(service.available)
            } )

            return res.status(200).json({
                status: true,
                message: "Here are the available services",
                services: array
            })
        }

        return res.status(400).json({
            status: false,
            message: "Financial Institution Not Available"
        }).end()

    } catch (error) {
        console.error(error)
        next(error)
    }
};



module.exports = AvailableServices;