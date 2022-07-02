const { getProfile } = require('./middleware/getProfile');
const { onlyAdmin } = require('./middleware/onlyAdmin');
const jobController = require('./routes/job/job.controller');
const balanceController = require('./routes/balance/balance.controller');
const adminController = require('./routes/admin/admin.controller');
const contractController = require('./routes/contract/contract.controller');
const routes = (app) => {

    app.get('/contracts/:contract_id', getProfile, contractController.getContractById);
    app.get('/contracts', getProfile, contractController.getContracts);
    
    app.get('/jobs/unpaid', getProfile, jobController.getUnpaidJobs);
    app.post('/jobs/:job_id/pay', getProfile, jobController.payJob);
    
    app.post('/balances/deposit/:user_id', balanceController.balancesDeposit )   //Not validating the profile_id in any moment
    
    app.get('/admin/best-profession', onlyAdmin, adminController.getBestProfession); //Implemented custom middleware for simulating an admin rights
    app.get('/admin/best-clients', onlyAdmin, adminController.getBestClients); //Implemented custom middleware for simulating an admin rights
    
};

module.exports = routes;


