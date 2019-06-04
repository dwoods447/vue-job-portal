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
            console.log(`Profile info received at first ${req.body}`);
            const profile = await JobseekerProfile.update(req.body)
            console.log(`Profile info sending back from update ${profile}`);
            res.send({
                profile: profile
              
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },


}