const {Job} = require('../models')
// import {Jobseeker} = require('../models')
module.exports = {
    async viewAllJobs(req, res){
        try{
            const jobs  = await Job.findAll();
            let jobJSON = jobs.toJSON();
            res.send({ 
                jobs: jobJSON
            })    
        }catch(err){`error: ${err}`}
    },

    async searchJob(req, res){
        const search = req.params.search;
        
        const job = await Job.findAll({
            where:{
                $or: ['jobTitle','description', 'location' ].map(key => ({
                  [key]: search
                }))
            }
        })
        const jobJSON = job.toJSON();
        res.send({
            job: jobJSON
        })
    }
}