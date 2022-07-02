const request = require('supertest');
const seed = require('../scripts/scriptSeedDb');
const app = require('../src/app');

beforeAll(async () => {
    return await seed()
});

describe('Contracts', () => {


    describe('GET /contracts/1', () => {
       
        it('return 401 when profile_id does not exist', async () => {
            await request(app).get('/contracts/1').set('profile_id', 999).expect(401);
        });

        it('should get a contract from  profile_id 1', async () => {
            const { body, statusCode } = await request(app).get('/contracts/1').set('profile_id', 1);

            expect(statusCode).toEqual(200);
            expect(body).toMatchObject({
                id: 1,
                terms: 'bla bla bla',
                status: 'terminated',
                ClientId: 1,
                ContractorId: 5
            });
        });
    });

    describe('GET /contracts', () => {
        it('return 401 when profile_id does not exist', async () => {
            await request(app).get('/contracts').set('profile_id', '999').expect(401);
        });

        it('should get a contract from  profile_id 1', async () => {
            const { body, statusCode } = await request(app).get('/contracts').set('profile_id', 1);

            expect(statusCode).toEqual(200);
            expect(body).toHaveLength(2);
            const firstLine = body[0];
            expect(firstLine).toMatchObject({
                id: 1,
                terms: 'bla bla bla',
                status: 'terminated',
                ClientId: 1,
                ContractorId: 5
            });

        });
    });
});
