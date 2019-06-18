const {EmployerProfile} = require('../models')
const {JobseekerProfile} = require('../models')
const {Favorite} = require('../models')
const {JobApplicant} = require('../models')
const {Job} = require('../models')
module.exports = {

    async getFavoritedJobsForJobseekerProfile(req, res){
        try {
            console.log(`Favorites for id ${JSON.stringify(req.params.jobseekerId)}`);
            const favorites = await Favorite.findAll({
                where: {
                    JobseekerId: req.params.jobseekerId
                },
                include: [{
                    all: true
                }]
            })
            console.log(`Favorites returned: ${JSON.stringify(favorites)}`)
            res.send({
                data: favorites
            })
        } catch (error){
            res.send({
               error: error
            })
        }
        
    },
    async updateEmployerProfile(req, res){
        try{
            const profile = await EmployerProfile.findOne({where:{id: req.body.id}})
            const update = await EmployerProfile.update(req.body)
            let profileJON = profile.toJSON();
            res.send({
                profile: profileJON,
                update: update
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },

    async updateJobseekerProfile(req, res){
        try{
             console.log(`Profile info received at first ${JSON.stringify(req.body)}`);
            let updateObj = {};
            
            if (req.body.photo) {
                updateObj.photo = req.body.photo;
            }
            if (req.body.address) {
                updateObj.address = req.body.address;
            } 
            if (req.body.phone) {
              updateObj.phone = req.body.phone;      
            }
            if (req.body.gender) {
              updateObj.gender = req.body.gender 
            }
            if (req.body.bio) {
              updateObj.bio = req.body.bio;      
            }
            if (req.body.dob) {
                updateObj.dob = req.body.dob
            }
            if (req.body.resume) {
                updateObj.resume = req.body.resume;
            }
            if (req.body.coverletter) {
                updateObj.coverletter = req.body.coverletter;
            }
            
            let whereObj = {where:{ jobseekerId: req.body.id}}
            
           // console.log(`*** Object to be inserted: ${JSON.stringify(updateObj)}`)
            const profile = await JobseekerProfile.update(updateObj, whereObj)
            // console.log(`Profile info sending back from update ${JSON.stringify(profile)}`);
            res.send({
                profile: profile
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },


    async getJobSeekerProfileInfo (req, res){
        try{
           
            // console.log(`ID that was passed in to profile info: ${JSON.stringify(req.params.jobseekerId)}`)
            const jobSeeker = await JobseekerProfile.findOne({
                where: {jobseekerId: req.params.jobseekerId}
            })
            // console.log(`Job Seeker that was found ${JSON.stringify(jobSeeker)}`);
            res.send({
                jobseeker: jobSeeker
            })
        } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    },

    async getEmployerProfileInfo(req, res){
    try{
        // console.log(`ID that was passed in to profile info: ${JSON.stringify(req.params.employerId)}`)
        const employer = await EmployerProfile.findOne({
            where: {employerId: req.params.employerId}
        })

        // console.log(`Employer that was found ${JSON.stringify(employer)}`);
        res.send({
            data: employer
        })
    } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    },

    async getJobAppliedFor(req, res){
      try{   
         console.log(`ID that was passed in: ${JSON.stringify(req.jobseeker.id)}`)
        const applications = await JobApplicant.findAll({
            include: [{ model: Job }],
            where: {JobseekerId: req.jobseeker.id}
          });
        res.send({
          data: applications
        })
      } catch(err){
        res.send({
          error:  `There was an error: ${err}`
        })
      }
     
    },

}