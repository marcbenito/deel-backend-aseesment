
const request = require('supertest');
const seed = require('../scripts/scriptSeedDb');
const app = require('../src/app');


beforeAll(async () => {
    return await seed();
});
describe('Admin', () => {
    describe('GET /admin/best-profession', () => {
        it('return 401 without credentials', async () => {
            await request(app).get('/admin/best-profession?start=2019-1-1&end=2022-12-1').expect(401);
        });
 
        it('when valid  admin access provided but no query params', async () => {
            const { text, statusCode } = await request(app)
                .get('/admin/best-profession')
                .set('im_admin', 'true');

            expect(statusCode).toEqual(200);
            expect(text).toEqual('Programmer');
            
        });
        it('when valid  admin access provided with start and end', async () => {
            const res = await request(app)
                .get('/admin/best-profession?start=2019-1-1&end=2022-12-1')
                .set('im_admin', 'true');


            expect(res.statusCode).toEqual(200);
            expect(res.text).toEqual('Programmer');
            
        });
    });

    describe('GET admin/best-clients', () => {
        it('return 401 without credentials', async () => {
            await request(app).get('/admin/best-clients?start=2019-1-1&end=2020-1-1').expect(401);
        });
 
        it('when valid admin access without params', async () => {
            const { body, statusCode } = await request(app)
                .get('/admin/best-clients')
                .set('Content-Type', 'text/html')
                .set('im_admin', 'true');

            expect(statusCode).toEqual(200);
            expect(body.length).toEqual(2) ;
            
            
        });
        it('when valid admin access provided with start and end and limit 1', async () => {
            const { body, statusCode } = await request(app)
                .get('/admin/best-clients?start=2019-1-1&end=2023-1-1&limit=1')
                .set('im_admin', 'true');


            expect(statusCode).toEqual(200);
            expect(body.length).toEqual(1) ;

            
        });
        it('Invalid start date', async () => {
            const { body, statusCode } = await request(app)
                .get('/admin/best-clients?start=im-an-invalid-date&end=2022-1-1&limit=1')
                .set('im_admin', 'true');
            expect(statusCode).toEqual(400);
        });

        it('Invalid end date', async () => {
            const { body, statusCode } = await request(app)
                .get('/admin/best-clients?start=2022-1-1&end=im-an-invalid-date&limit=1')
                .set('im_admin', 'true');
            expect(statusCode).toEqual(400);
        });
        
    });
   
});
