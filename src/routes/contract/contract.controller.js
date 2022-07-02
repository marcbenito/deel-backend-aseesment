const manageErrors = require('../../shared/utils');
const Service = require('./contract.service');



const Controllers = {
    getContractById: async (req, res) => {
        try {
            let { contract_id } = req.params;
            contract_id = parseInt(contract_id);

            if (isNaN(contract_id)) return res.status(400).end();

            const result = await Service.getContractById(contract_id, req.get('profile_id'));
            if (!result) return res.status(404).end();
            res.json(result);
        } catch (err) {
            manageErrors(err, res);
        }
    },
    getContracts: async (req, res) => {
        try {
            const profileId = parseInt(req.get('profile_id'));
            const result = await Service.getContractsByProfile(profileId);
            if (!result) return res.status(404).end();
            res.json(result);
        } catch (err) {
            manageErrors(err, res);
        }
    },
   




};

module.exports = Controllers;
