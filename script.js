require('dotenv').config();
const bcrypt = require('bcrypt')

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.DATABSE_URL, { useNewUrlParser: true }, async (error, client) => {
	if (error) {
		console.log("App startup failed. An error occurred while connecting to Database.", error);
		process.exit();
	}
  
    console.log("Connected successfully to database server");
    const db = client.db(process.env.DATABASENAME); 
    
    const cards = db.collection('cards')
    const accounts = db.collection('accounts')
    const services = db.collection('services')


    let deletedCards = await cardsDown(cards)
    let cardsInserted = await createCards(cards)

    let deleteAccount = await accountDown(accounts)
    let createdAccount = await createAccount(accounts)


    let deletedServices = await dropServices(services)
    let createdServices = await createServices(services)


    console.log({cardsInserted, createdAccount})
});


async function cardsDown(cards) {
    let deleted =  await cards.deleteMany({bank: "002"})
    let del =  await cards.deleteMany({bank: "001"})

    return {
        deleted,
        del
    }
}


async function createCards(cards) {

    hash = bcrypt.hashSync("1234", 12)
    return await cards.insertMany([
        {
            pin: hash,
            bank: "002",
            accountNumber: "1029209202",
            cardType: "Master Card",
            cardNumber: "5105105105105100"
        },
        {
            pin: hash,
            bank: "002",
            accountNumber: "1029209201",
            cardType: "Master Card",
            cardNumber: "5555555555554444"
        },
        {
            pin: hash,
            bank: "001",
            accountNumber: "010101021",
            cardType: "Master Card",
            cardNumber: "5485832319637301"
        },
        {
            pin: hash,
            bank: "001",
            accountNumber: "0011902381",
            cardType: "Visa Card",
            cardNumber: "4111111111111111"
        },
        {
           
            pin: hash,
            bank: "001",
            accountNumber: "0011902380",
            cardNumber: "4012888888881881",
            cardType: "Visa Card"
        },
        {
            pin: hash,
            bank: "002",
            accountNumber: "0011907234",
            cardType: "Visa Card",
            cardNumber: "4222222222222"
        }
    ])
}


async function accountDown(accounts){
    return await accounts.deleteMany({})
}

async function createAccount(accounts) {
    return await accounts.insertMany([
        {
            accountNumber: "1029209202",
            accountName: "Sofia Woodward",
            accountType: "Savings",
            banlance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "1029209201",
            accountName: "Joel Bull",
            accountType: "Savings",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "010101021",
            accountName: "Chelsea Harrison",
            accountType: "Savings",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011902381",
            accountName: "Ella Gardner",
            accountType: "Savings",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011902380",
            accountName: "Jamie Charlton",
            accountType: "Savings",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011907234",
            accountName: "Sofia Green",
            accountType: "Savings",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        }
    ])
}


async function dropServices(services) {
    return await services.deleteMany({})
}


async function createServices(services) {
    return await services.insertMany([
        {
            available: "Cash Withdrawal"
        },
        {
            available: "Balance Inquiry"
        },
        {
            available: "Bills Payment"
        },
        {
            available: "Quick Teller"
        },
        {
            available: "Change Pin"
        }
    ])
}