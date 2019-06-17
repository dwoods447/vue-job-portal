const {Job} = require('../models')
const {Employer} = require('../models')
const { EmployerProfile } = require('../models')
 const { Op } = require('sequelize')
const {JobApplicant} = require('../models')
const {Favorite} = require('../models')
// const db = require('../models')
module.exports = {
    async checkFavoritedJob(req, res){
        console.log('Checking JobFavorites Server Side...');
        console.log(`Request Params Jobseeker ID ${JSON.stringify(req.params.jobseekerId)}`)
        console.log(`Request Params Job ID ${JSON.stringify(req.params.jobId)}`)
        try{
          const isInFavorites = await Favorite.findOne({
            where: {JobId: req.params.jobId, JobseekerId: req.params.jobseekerId }
          });
          console.log(`Favorites Status: ${JSON.stringify(isInFavorites)}`)
          res.send({
              data: isInFavorites
          })
        } catch (error){
          res.send({
              data: error
          })
        }
    },

    async addJobToFavorites (req, res){
        try {
            console.log(`Add to Job Favorites params: ${JSON.stringify(req.params)}`);
            const favoritedJob = await Favorite.create({
                JobId: req.params.jobid,
                JobseekerId: req.params.jobseekerId
            });
            let favoritedJobJSON = favoritedJob.toJSON();
            res.send({
                data: favoritedJobJSON,
              
            })
        } catch (error){
            res.send({
                error: error,
                
            })
        }
    
    },

    async removeJobFromFavorites(req, res){
        try {
            console.log(`Remove Job Favorites params: ${JSON.stringify(req.params)}`);
            const favoritedJob = await Favorite.destroy({
                where:  {
                JobId: req.params.jobid,
                JobseekerId: req.params.jobseekerId
              }
            });
            let favoritedJobJSON = favoritedJob.toJSON();
            res.send({
                data: favoritedJobJSON,
              
            })
        } catch (error){
            res.send({
                error: error,
                
            })
        }
    },

    async employerJob(req, res){
      const employer = await Employer.findOne({
        where: {
          id: req.params.employerId,
        },
        include: [
           {model: Job} 
        ]
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
             const allJobs = await Job.findAll({
                include: [{ model: Employer, include: [
                  {model: EmployerProfile}
                ] }],
                where: {active: 1}
             });
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
        console.log(`Request Body ${JSON.stringify(req.params)}`)
        // console.log(`Request Query ${JSON.stringify(req.query)}`)
        try{
            const job = await Job.findAll({
                where:{
                  [Op.or]: ['jobTitle','description', 'location' ].map(key => ({
                      [key]: {
                        [Op.like]: `%${req.params.search}%`
                      }
                    })),
                  active : 1  
                },
                include: [{ all: true }]
            })
            res.send({
                data: job
            })
        }catch(err){
            '${err}'
        }
       
       
    },

    async applyforJob(req, res){
        console.log(`Request Params Jobseeker ID ${JSON.stringify(req.params.jobseekerId)}`)
        console.log(`Request Params Job ID ${JSON.stringify(req.params.jobId)}`)
        console.log(`Request Body ${JSON.stringify(req.body)}`)
        try{
        //     const applicationSent = await  db.sequelize.query(`
        //     INSERT INTO jobapplicants (JobId, JobseekerId) VALUES (${req.params.jobId}, ${req.params.jobseekerId})
        // `, { type: db.sequelize.QueryTypes.SELECT })

            const applicationSent = await JobApplicant.create({
                JobId: req.params.jobId,
                JobseekerId:req.params.jobseekerId,
                
            });
            console.log(`Result: ${JSON.stringify(applicationSent)}`)
            // const updatedJobApplicantID = await JobApplicant.update({
            //     where:{JobApplicantId: applicationSent.id}
            // })
            res.send({
                data: applicationSent,
            })
        } catch (error){
            res.send({
                data: error
            })
        }
    },

    async checkJobSeekerApplication(req, res){
      console.log('Checking Application Server Side...');
      console.log(`Request Params Jobseeker ID ${JSON.stringify(req.params.jobseekerId)}`)
      console.log(`Request Params Job ID ${JSON.stringify(req.params.jobId)}`)
      try{
        const applicationSent = await JobApplicant.findOne({
          where: {JobId: req.params.jobId, JobseekerId: req.params.jobseekerId }
        });
        console.log(`Application Status: ${JSON.stringify(applicationSent)}`)
        res.send({
            data: applicationSent
        })
      } catch (error){
        res.send({
            data: error
        })
      }
    }
}