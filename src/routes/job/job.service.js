const { Op } = require('sequelize');

const { Contract, Job, Profile, sequelize } = require('../../model');

const services  = {

     doPayJob: async (profileId, jobId) =>{
        const t = await sequelize.transaction();
        try {
            const clientProfile = await services._getProfile(profileId, t);
            const job = await services._getJobById(jobId, t);
            const contract = await Contract.findOne({
                where: { id: job.ContractId }
            });
            const contractorProfile = await services._getProfile(contract.ContractorId, t);

            //Validatons
            if (contract.ClientId !== clientProfile.id) {
                throw { statusCode: 401, msg: 'You are not authorized to pay this job' };
            }
            if (job.paid) {
                throw { statusCode: 400, msg: 'Job already paid' };
            }
            if (clientProfile.balance < job.price) {
                throw { statusCode: 401, msg: 'You do not have enough money to pay this job' };
            }

            clientProfile.balance -= job.price;
            contractorProfile.balance += job.price;

            await clientProfile.save({ transaction: t });
            await contractorProfile.save({ transaction: t });
            job.paid = true;
            job.paymentDate = new Date();
            await job.save({ transaction: t });

            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

     _getProfile: async (profileId, t)=> {
        const profile = await Profile.findOne({
            where: { id: profileId },
            transaction: t
        });
        return profile;
    },
     _getJobById: async(jobId, t) =>{
        return await Job.findOne({
            where: { id: jobId },
            transaction: t
        });
    },
    getJobsByProfileFilterUnpaid: async (profileId) => {
        const jobs = await Job.findAll({
            include: [
                {
                    model: Contract,
                    where: {
                        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }]
                    }
                }
            ],
            where: {
                [Op.or]: [{ paid: null }, { paid: false }]
            }
        });
        return jobs.map((job) => {
            return {
                id: job.id,
                description: job.description,
                price: job.price,
                paid: job.paid,
                paymentDate: job.paymentDate,
                createdAt: job.createdAt,
                updatedAt: job.updatedAt,
                ContractId: job.ContractId
            };
        });
    }
    
}


module.exports = services