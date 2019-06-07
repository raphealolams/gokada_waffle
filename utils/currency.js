const Currency = {}
Currency.moneyFormater =  function moneyFormater(currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  })
}


module.exports = Currency;