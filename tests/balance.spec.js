
const request = require('supertest');
const seed = require('../scripts/scriptSeedDb');
const app = require('../src/app');


beforeAll(async () => {
    return await seed();
});
describe('Balances', () => {
   
    describe('POST /balances/deposit/1', () => {
        it('return 401 with amount too high', async () => {
           const {statusCode, text } = await request(app)
                .post('/balances/deposit/1')
                .send({amount:40000})

            expect(statusCode).toEqual(401);
            expect(text).toEqual('The amount is too high');

        });


        it('return 401 with amount too high', async () => {
            const {statusCode, text } = await request(app)
                 .post('/balances/deposit/1')
                 .send({amount:1})
 
             expect(statusCode).toEqual(201);

 
         });
    })
});
