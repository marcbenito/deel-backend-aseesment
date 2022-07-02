const { Op } = require('sequelize');

const { Contract, Job, Profile, sequelize } = require('../../model');

const services = {
    getMostProfitableProfessionInTime: async (initDate, endDate) => {
        const query = `
            select p.profession, sum(j.price) as total 
            from Profiles p, Contracts co, Jobs j
            where 
                p.id = co.ContractorId and
                j.ContractId = co.id  and 
                j.paid = true and 
                j.createdAt between $$initDate AND $$endDate
            group by p.profession
            order BY total desc
            limit 1
        `;
        const records = await sequelize.query(query, {
            bind: { initDate, endDate },
            type: sequelize.QueryTypes.SELECT
        });

        if (records.length > 0) {
            return records[0].profession;
        } else {
            return '';
        }
    },
    getBestClients: async (initDate, endDate, limit = 2) => {

        const records = await Job.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
            include: [
                {
                    model: Contract,
                    include: [
                        {
                            model: Profile,
                            as: 'Client',
                            where: {
                                type: 'client'
                            }
                        }
                    ]
                }
            ],
            where: {
                paid: true,
                createdAt: {
                    //Doubting between paid and createdAd, the contract should be executed/done in the range but payed later..
                    [Op.between]: [initDate, endDate]
                }
            },
            group: ['Contract.Client.id'],
            limit: limit,
            order: sequelize.literal('total DESC')
        });
        return records.map((client) => ({
            paid: client.dataValues.total,
            fullName: `${client.Contract.Client.firstName} ${client.Contract.Client.lastName}`,
            id: client.Contract.Client.id
        }));
    }
};

module.exports = services;
