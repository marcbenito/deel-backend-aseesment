const manageErrors = require('../../shared/utils');
const Services = require('./balance.service');


const Controllers = {

    balancesDeposit: async (req, res) => {
        try {
            const clientId = req.params.user_id;

            let { amount } = req.body;
            if (!amount && amount !== 0) return res.status(400).end(); //validating that amount is present.

            var regexp = /^[0-9]*(\.[0-9]{0,2})?$/; //Regex for validating the amount decimals.
            if (!regexp.test) {
                return res.status(400).send('Invalid amount').end();
            }
            amount = parseFloat(amount); //converting into a float.

            const result = await Services.depositMoney(clientId, amount);
            if (!result) return res.status(404).end();

            //returning only an ok.
            res.status(201).end();
        } catch (e) {
            manageErrors(e, res);
        }
    }
};

module.exports = Controllers;
