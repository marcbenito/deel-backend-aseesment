const { Op } = require('sequelize');

const { Contract, Job, Profile, sequelize } = require('../../model');

const service  = {
    

     depositMoney:async(clientId, amount) => {
        const t = await sequelize.transaction();
        try {
            const totalPendingAmount = await service.getPendingJobsToPay(clientId,t);
            if (amount > (totalPendingAmount * 0, 25)) {
                throw { statusCode: 401, msg: 'The amount is too high' };
            }

            const client = await Profile.findByPk(clientId, { transaction: t });
            client.balance = parseFloat((client.balance + amount).toFixed(2));
            await client.save({ transaction: t });

            await t.commit();
            return true;
        } catch (error) { 
            await t.rollback();
            throw error;
        }
    },
    getPendingJobsToPay:async(clientId, t)=> {
        const jobs = await Job.sum('price', {
            attributes: [sequelize.fn('sum', sequelize.col('price'))],
            where: {
                [Op.or]: [{ paid: null }, { paid: false }]
            },
            include: [
                {
                    model: Contract,
                    attributes: [],
                    where: {
                        ClientId: clientId
                    }
                }
            ],
            transaction: t
        });

        return jobs;
    }

}     


module.exports = service