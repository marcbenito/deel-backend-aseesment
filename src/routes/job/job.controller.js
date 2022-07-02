const manageErrors = require('../../shared/utils');
const Service = require('./job.service');

const Controllers = {

    getUnpaidJobs: async (req, res) => {
        try {
            const profileId = parseInt(req.get('profile_id'));
            const result = await Service.getJobsByProfileFilterUnpaid(profileId);

            if (!result) return res.status(404).end();
            res.json(result);
        } catch (err) {
            manageErrors(err, res);
        }
    },
    payJob: async (req, res) => {
        try {
            const job_id = parseInt(req.params.job_id);

            const profileId = parseInt(req.get('profile_id'));
            if (!profileId) return res.status(404).end();

            const result = await Service.doPayJob(profileId, job_id);
            if (!result) return res.status(404).end();
            res.json(result);
        } catch (e) {
            manageErrors(e, res);
        }
    },




};

module.exports = Controllers;
