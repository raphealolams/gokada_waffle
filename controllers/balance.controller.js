/**
 * @author Ajilore Raphael Olamide <raphealolams@yahoo.com raphealolams@gmail.com>
 * @author Everything about balance inquiry
*/
const BankServices = require('../service')
const currencyFormatter = require('../utils/currency').moneyFormater

const BalanceInquiry = {};

BalanceInquiry.getBalance = async function getBalance(req, res, next) {
    try {
        const { decoded } = res;
        if (decoded && decoded.validated) {

            const { card: {accountNumber} } = decoded

            const userBalance = await BankServices.retrieveBalance(accountNumber)

            if (userBalance) {

                return res.status(200).json({
                    status: true,
                    message: "",
                    balance: {
                        availableBalance: currencyFormatter("NGN").format(userBalance.balance.available.trim()),
                        ledgerBalance: currencyFormatter("NGN").format(userBalance.balance.ledger.trim())
                    }
                }).end()
            }


            return res.status(200).json({
                status: false,
                message: "Financial Institution Not Available",
                balance: null
            }).end();
        }

        return res.status(200).json({
            status: false,
            message: "Invalid Credentials"
        }).end()

    } catch (error) {
        console.error(error)
        next(error)
    }
}


module.exports = BalanceInquiry;