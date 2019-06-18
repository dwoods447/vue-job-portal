 const {JobCategory}  = require('../models/')
 const {Job}  = require('../models/')
 const {JobApplicant}  = require('../models/')
 const {Jobseeker}  = require('../models/')
 const {JobseekerProfile}  = require('../models/')
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
          res.status(500).send({
            error: err
           })
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
          res.status(500).send({
            error: err
          })
        }
     },

     async deleteJob(req, res){
      try{
          const job = await Job.update({active: 0}, {where:{id: req.params.jobId}})
           console.log(`Job Found: ${JSON.stringify(job)}`);
          // console.log(`Job JSON: ${JSON.stringify(jobJSON)}`);
          if(job){
            res.send({
                success: 'The job was removed.',
            })
          }
      } catch(err){
          res.send({
              error:  `There was an error: ${err}`
          })
      }
  },

     async updateJob(req, res){
        try {
            let updateObj = {};
             if(req.body.jobTitle)updateObj.jobTitle = req.body.jobTitle;
             if(req.body.location)updateObj.location = req.body.location;
             if(req.body.type)updateObj.type = req.body.type;
             if(req.body.description)updateObj.description = req.body.description;
             if(req.body.active)updateObj.active = req.body.active;
             if(req.body.job_ending)updateObj.job_ending = req.body.job_ending;
             if(req.body.JobCategoryId)updateObj.JobCategoryId = req.body.JobCategoryId;
             const whereObj = {where:{EmployerId: req.body.EmployerId}}    
             const job = Job.update(updateObj, whereObj)
                console.log(`Job updated: ${JSON.stringify(job)}`);
                res.send({
                    data: job
                })
        }catch(err){
          res.status(500).send({
            error: err
         })
        }
     },

     async getEmployerJobs(req, res){
         try{
            console.log(`Job info recieved: ${JSON.stringify(req.params.employerId)}`)
            const jobs = await Job.findAll(
                {where: {EmployerId: req.params.employerId, active: true}},
               
            )
            // console.log(`Employer Jobs found: ${JSON.stringify(jobs)}`)
            // const jobsJSON = jobs.toJSON();
            res.send({
                data: jobs
            })
         }catch(err){
          res.status(500).send({
            error: err
          })
         }
       
     },
     async getFeaturedCompanies(req, res){
         try{
            const featuredCompanies = await  db.sequelize.query(`
            SELECT employers.id, employers.company, employerprofiles.website, employerprofiles.coverphoto,
            employerprofiles.description
            FROM  employerprofiles INNER JOIN employers ON employers.id = employerprofiles.EmployerId
            ORDER BY RAND() LIMIT 3
        `, { type: db.sequelize.QueryTypes.SELECT })
        console.log('\r\n\r\n');
        console.log('\r\n\r\n');
         res.send({
            data: featuredCompanies
          })
         } catch(err) {
          res.status(500).send({
            error: err
          })
         }
            
     },

     async getJobApplicants(req, res){
        try{
          const jobApplicants = await JobApplicant.findAll({
           
            include:[
              { model: Job, where: { EmployerId: req.params.employerId},}, 
              { model: Jobseeker, include: [{model: JobseekerProfile}]} 
            ],
          })  
        //     const jobApplicants = await  db.sequelize.query(`
        //     SELECT jobs.id, jobseekerprofiles.photo, jobseekerprofiles.address, jobseekerprofiles.phone, jobseekerprofiles.gender,
        //     jobseekerprofiles.dob, jobseekerprofiles.bio, jobseekerprofiles.resume, jobseekerprofiles.coverletter,
        //     jobseekers.name, jobseekers.email, jobs.jobTitle, jobs.type, jobs.EmployerId
        //     FROM jobseekerprofiles 
        //     INNER JOIN jobseekers ON jobseekerprofiles.JobseekerId = jobseekers.id
        //     INNER JOIN jobapplicants ON jobseekers.id = jobapplicants.JobseekerId
        //     INNER JOIN jobs ON jobapplicants.JobId = jobs.id
        //     INNER JOIN employers ON employers.id = jobs.EmployerId
        //     WHERE jobs.EmployerId = ${req.params.employerId}
        // `, { type: db.sequelize.QueryTypes.SELECT })
        console.log('\r\n\r\n');
        console.log('\r\n\r\n');
         res.send({
            data: jobApplicants
          })
         } catch(err) {
           res.status(500).send({
            error: err
           })
         } 
     }
 }
