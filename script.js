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
    const account = db.collection('accounts')

    let deletedCards = await cardsDown(cards)
    let cardsInserted = await createCards(cards)

    let deleteAccount = await accountDown(account)
    let createdAccount = await createAccount(account)

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


async function accountDown(account){
    return await account.deleteMany({})
}

async function createAccount(account) {
    return await account.insertMany([
        {
            accountNumber: "1029209202",
            accountName: "Sofia Woodward",
            banlance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "1029209201",
            accountName: "Joel Bull",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "010101021",
            accountName: "Chelsea Harrison",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011902381",
            accountName: "Ella Gardner",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011902380",
            accountName: "Jamie Charlton",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        },
        {
            accountNumber: "0011907234",
            accountName: "Sofia Green",
            balance: {
                available: 10000,
                ledger: 10000
            },
            transactions: []
        }
    ])
}