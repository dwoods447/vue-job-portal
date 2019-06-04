const {EmployerProfile} = require('../models')
 const {JobseekerProfile} = require('../models')


module.exports = {
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
            
            console.log(`*** Object to be inserted: ${JSON.stringify(updateObj)}`)
            const profile = await JobseekerProfile.update(updateObj, whereObj)
            console.log(`Profile info sending back from update ${JSON.stringify(profile)}`);
            res.send({
                profile: profile
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },


    async getProfileInfo (req, res){
        try{
            const jobSeeker = await JobseekerProfile.findOne({
                jobseekerId: req.body.id
            })
            console.log(`Job Seeker that was found${JSON.stringify(jobSeeker)}`);
            res.send({
                jobseeker: jobSeeker
            })
        } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    }


}