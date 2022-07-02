
const request = require('supertest');
const seed = require('../scripts/scriptSeedDb');
const app = require('../src/app');


beforeAll(async () => {
    return await seed();
});
describe('Jobs', () => {
    describe('GET /jobs/unpaid', () => {
        it('return 401 when profile_id does not exist', async () => {
            await request(app).get('/jobs/unpaid').set('profile_id', '999').expect(401);
        });
 
        it('when valid  profile_id provided', async () => {
            const { body, statusCode } = await request(app).get('/jobs/unpaid').set('profile_id', 1);

            expect(statusCode).toEqual(200);
            expect(body).toHaveLength(2);
            expect(body[0].id).toEqual(1);
            expect(body[0].ContractId).toEqual(1);
            expect(body[0].description).toEqual('work');
            expect(body[0].price).toEqual(200);
            expect(body[0].paid).toEqual(null);
            expect(body[0].paymentDate).toEqual(null);
        });
    });
    describe('POST /jobs/:id/paid', () => {
        it('return 401 if job can be paid', async () => {
           const res = await request(app)
                .post('/jobs/1/pay')
                .set('profile_id', 10);

            expect(res.statusCode).toEqual(401);

        });


        it('return OK if job can be paid', async () => {
        const {statusCode} = await request(app)
            .post('/jobs/1/pay')
            .set('profile_id', 1);

        expect(statusCode).toEqual(200);
        });
    })
});
