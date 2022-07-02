const manageErrors = require('./../../shared/utils');
const Services = require('./admin.service');

const _getAndvalidateDates = (params) => {
    let { start, end } = params;

    if (!start) {
        start = '1900-01-01';
    }
    if (!end) {
        end = '2100-01-01';
    }

    let isValidDate = Date.parse(start);
    if (isNaN(isValidDate)) {
        // when is not valid date logic
        throw { statusCode: 400, msg: 'Invalid date' };
    }
    isValidDate = Date.parse(end);
    if (isNaN(isValidDate)) {
        // when is not valid date logic
        throw { statusCode: 400, msg: 'Invalid date' };
    }
    return { start, end };
};

const Controllers = {

    getBestProfession: async (req, res) => {
        try {
            const { start, end } = _getAndvalidateDates(req.query);

            const result = await Services.getMostProfitableProfessionInTime(start, end);

            if (!result) return res.status(404).end();

            res.status(200).send(result).end();
        } catch (e) {
            manageErrors(e, res);
        }
    },

    getBestClients: async (req, res) => {
        try {
            const { start, end } = _getAndvalidateDates(req.query);
            let limit = parseInt(req.query.limit);
            if (isNaN(limit)) limit = 2;

            const result = await Services.getBestClients(start, end, limit);
            if (!result) return res.status(404).end();

            res.send(result).end();
        } catch (e) {
            manageErrors(e, res);
        }
    },

    
};

module.exports = Controllers;
