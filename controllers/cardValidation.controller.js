/**
 * @author Ajilore Raphael Olamide <raphealolams@yahoo.com raphealolams@gmail.com>
 * @author Everything about Pin Authentication
*/
const tokenGenerator = require('../middleware/auth').generateAccessToken
const BankServices = require('../service')

const CardValidation = {};

CardValidation.verifyCard = async function verifyCard(req, res, next) {
    try {
        const { pin, bank, accountNumber, cardType, cardNumber } = req.body
        const isCard = await BankServices.validateCard(cardType, cardNumber, bank, pin, accountNumber)

        if (isCard.validated) {
            isCard.pin = undefined;

            let token = tokenGenerator(isCard)
            return res.status(200).json({
                status: true,
                message: "Authentication Successful",
                token
            }).end()
        }

        return res.status(200).json({
            status: false,
            message: "invalid credentials",
            pinLimitReached: BankServices.pinLimit().limitReached,
            retainCard: BankServices.pinLimit().retry === 0 ? true : false

        }).end()

    } catch (error) {
        console.error(error)
        next(error)
    }
}


module.exports = CardValidation;