 const {JobCategory}  = require('../models/')
 const {Job}  = require('../models/')
// const {Job}  = require('../models/')
const db = require('../models')

 module.exports  = {
     async getCategories(req, res){
            const categories  = await JobCategory.findAll();
            // const categoriesJSON = categories.toJSON();
            res.send({
                data: categories
            }) 
     },
     async getJobTypes(req, res){
         try {
            console.log(`Querying...`)
            // const types  = await sequelize.query("SELECT distinct type from `jobs`", { raw: true });
            const types = await db.sequelize.query("SELECT distinct type from jobs");
            // const jobTypesJSON = types.toJSON();  
            // console.log(`Result of query ${JSON.stringify(jobTypesJSON)}`)
              console.log(`Result of query ${JSON.stringify(types)}`)
             res.send({
              data: types
            })    
         }catch(err){
              `Error: ${err}`
         }

          
     },

     async createJob(req, res){
        try {
            console.log(`Job info recieved: ${req.body}`)
            const createdJob = await Job.create(req.body);
            let createdJobJSON = createdJob.toJSON()
            res.send({
                data: createdJobJSON
            })
        }catch(err){
          `${err}`
        }
        res.send({
            data: 'Creating Job...'
        })
     },

     async getEmployerJobs(req, res){
         try{
            console.log(`Job info recieved: ${JSON.stringify(req.params.employerId)}`)
            const jobs = await Job.findAll({
                where: {EmployerId: req.params.employerId}
            })
            // console.log(`Employer Jobs found: ${JSON.stringify(jobs)}`)
            // const jobsJSON = jobs.toJSON();
            res.send({
                data: jobs
            })
         }catch(err){
            `${err}`
         }
       
     }
 }
