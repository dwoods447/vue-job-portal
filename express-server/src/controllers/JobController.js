const {Job} = require('../models')
const {Employer} = require('../models')
const { EmployerProfile } = require('../models')
 const { Op } = require('sequelize')
const {JobApplicant} = require('../models')
const {Favorite} = require('../models')
// const db = require('../models')
module.exports = {
    async checkFavoritedJob(req, res){
        try{
          const isInFavorites = await Favorite.findOne({
            where: {JobId: req.params.jobId, JobseekerId: req.params.jobseekerId }
          });
          return  res.send({
              data: isInFavorites
          })
        } catch (error){
            return    res.send({
              data: error
          })
        }
    },

    async addJobToFavorites (req, res){
        try {
            const favoritedJob = await Favorite.create({
                JobId: req.params.jobid,
                JobseekerId: req.params.jobseekerId
            });
            let favoritedJobJSON = favoritedJob.toJSON();
            return   res.send({
                data: favoritedJobJSON,
              
            })
        } catch (error){
            return    res.send({
                error: error,
                
            })
        }
    
    },

    async removeJobFromFavorites(req, res){
        try {
            const favoritedJob = await Favorite.destroy({
                where:  {
                JobId: req.params.jobid,
                JobseekerId: req.params.jobseekerId
              }
            });
            let favoritedJobJSON = favoritedJob.toJSON();
            return  res.send({
                data: favoritedJobJSON,
              
             })
        } catch (error){
            return  res.send({
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
      const employerJSON  = employer.toJSON();
      return  res.send({
             data: employerJSON,
        })
    },
    async viewJob(req, res){
        try{
            const job = await Job.findOne({where:{id: req.params.jobId}})
            let jobJSON = job.toJSON();
            return  res.send({
                data: jobJSON,
            })
        } catch(err){
            return res.send({
                error:  `There was an error: ${err}`
            })
        }
    },
    async viewAllJobs(req, res){
        try{
             const allJobs = await Job.findAll({
                include: [{ model: Employer, include: [
                  {model: EmployerProfile}
                ]}],
                where: {active: 1}
             });
            return res.send({data: allJobs});
        } catch(err) {
            return res.status(500).send({
                error: err
             })
        }
    },

    async searchJob(req, res){ 
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
            return  res.send({
                data: job
            })
        }catch(err){
            return res.status(500).send({
               error: err
            })
        }
       
       
    },

    async applyforJob(req, res){
        try {
            const applicationSent = await JobApplicant.create({
                JobId: req.params.jobId,
                JobseekerId:req.params.jobseekerId,
                
            });
            return  res.send({
                data: applicationSent,
            })
        } catch (error){
            return  res.send({
                data: error
            })
        }
    },

    async checkJobSeekerApplication(req, res){
      try{
        const applicationSent = await JobApplicant.findOne({
          where: {JobId: req.params.jobId, JobseekerId: req.params.jobseekerId }
        });
        return  res.send({
            data: applicationSent
        })
      } catch (error){
        return res.send({
            data: error
        })
      }
    }
}