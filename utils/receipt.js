const receipt = require('receipt');
const fs = require('fs');

Printer = {}


Printer.generateReceipt = function generateReceipt(bank, account, transaction, balance) {
    receipt.config.currency = '#';
    receipt.config.width = 60;
    receipt.config.ruler = '-';

    let path = `./receipt/${account.accountNumber}_${account.accountName}_${transaction.transType}.txt`

    console.log(transaction.transDate)
    const data = receipt.create([
        { type: 'text', value: [
            bank.name,
            bank.address,
            bank.email,
            bank.website
        ], align: 'center' },

        { type: 'empty' },

        { type: 'properties', lines: [
            { name: 'Account Number', value: account.accountNumber },
            { name: 'Account Name', value: account.accountName },
            { name: 'Account Type', value: account.accountType }
        ] },
        
        { type: 'empty' },
        
        { type: 'properties', lines: [
            { name: 'Transaction Date', value: `${transaction.transDate}` },
            { name: 'Transaction Type', value: transaction.transType },
            { name: 'Transaction Amount', value: transaction.transactionAmount }
        ] },
        { type: 'empty' },
        { type: 'properties', lines: [
            { name: 'Available Balance', value: balance.available },
            { name: 'Ledger Balance', value: balance.ledger }
        ] },
        { type: 'empty' },
        { type: 'text', value: 'Thank you', align: 'center', padding: 5 }
    ]);


    writeFile(path, data)

    return path
}


function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = Printer;