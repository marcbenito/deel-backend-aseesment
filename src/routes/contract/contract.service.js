const { Op } = require('sequelize');

const { Contract, Job, Profile } = require('../../model');

const services  = {
     getContractById: async (contractId, profileId) => {
        return await Contract.findOne({
            where: {
                [Op.and]: [
                    { id: contractId },
                    {
                        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }]
                    }
                ]
            }
        });
    },
     getContractsByProfile: async(profileId)=> {
        return await Contract.findAll({
            where: {
                [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }]
            }
        });
    },  
}


module.exports = services