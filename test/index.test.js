let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

let cardDetails = {
    pin: "1234",
    bank: "002",
    accountNumber: "0011907234",
    cardType: "Visa Card",
    cardNumber: "4222222222222"
}

let token = null

chai.use(chaiHttp)

/*
* Test the /POST route
*/
describe('/POST /api/verifyCard', () => {
    it('it should verify account details read from the atm card reader.', (done) => {
        chai.request(app)
            .post("/api/verifyCard")
            .send(cardDetails)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('status')
                res.body.status.should.be.a('boolean')

                res.body.should.have.property('message')
                res.body.message.should.be.a('string')

                res.body.should.have.property('token')
                res.body.token.should.be.a('string')

                token = res.body.token

                done()
            })
    });
});



/*
* Test the /GET route
*/
describe('/GET /api/getBalance', () => {
    it('it should get account balance.', (done) => {
        chai.request(app)
            .get("/api/getBalance")
            .set('USER-KEY', `bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('status')
                res.body.status.should.be.a('boolean')

                res.body.should.have.property('message')
                res.body.message.should.be.a('string')

                res.body.should.have.property('balance')
                res.body.balance.should.be.a('object')

                res.body.balance.should.have.property("availableBalance")
                res.body.balance.should.have.property("ledgerBalance")

                done()
            })
    });
});

/**
 *  Test the /GET route
 */
describe('/GET /api/getAvailableServices', () => {
    it('it should get ATM Available Service', (done) => {
        chai.request(app)
            .get("/api/getAvailableServices")
            .set('USER-KEY', `bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('status')
                res.body.status.should.be.a('boolean')

                res.body.should.have.property('message')
                res.body.message.should.be.a('string')

                res.body.should.have.property('services')
                res.body.balance.should.be.a('array')
                done()
            })
    });
});