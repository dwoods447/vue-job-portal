const {Job} = require('../models')
const {Employer} = require('../models')
// const { Op } = require('sequelize')
// import {Jobseeker} = require('../models')
module.exports = {
    async employerJob(req, res){
      const employer = await Employer.findOne({
        where: {
          id: req.params.employerId
        }
      })
      console.log(`Employer returned: ${employer}`)
      const employerJSON  = employer.toJSON();
       console.log(`Employer JSON: ${employerJSON}`)
       res.send({
        data: employerJSON,
    })
    },
    async viewJob(req, res){
        try{
            const job = await Job.findOne({where:{id: req.params.jobId}})
            // console.log(`Job Found: ${JSON.stringify(job)}`);
            let jobJSON = job.toJSON();
            // console.log(`Job JSON: ${JSON.stringify(jobJSON)}`);
            res.send({
                data: jobJSON,
            })
        } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    },
    async viewAllJobs(req, res){
        try{
             console.log('Getting All jobs...');
             const allJobs = await Job.findAll();
             // console.log('Converting to JSON...');
             // let allJobsJSON = allJobs.toJSON();
             console.log('Sending JSON back to receipeint...');
             res.send({data: allJobs});  
            // console.log(`Job in backend: ${JSON.stringify(jobs)}`);
            // let jobJSON = jobs.toJSON();
            // console.log(`Sending to front-end: ${JSON.stringify(jobJSON)}`);
         
        } catch(err) {
            `error: ${err}`
        }
    },

    async searchJob(req, res){
        // const search = req.params.search;
        
        const job = await Job.findAll({
            // where:{
            //   [Op.or]: ['jobTitle','description', 'location' ].map(key => ({
            //       [key]: {
            //         [Op.like]: `%${search}%`
            //       }
            //     }))
            // }
        })
        const jobJSON = job.toJSON();
        res.send({
            job: jobJSON
        })
    }
}