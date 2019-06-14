const {Employer} =  require('../models')
const {Jobseeker} =  require('../models')
const {EmployerProfile} = require('../models')
const {JobseekerProfile} = require('../models')
const config = require('../config/config')
const jwt   = require('jsonwebtoken')
//Helper functions

function jwtSignEmployer(employer){
const ONE_WEEK = 60*50*24*7
 return jwt.sign(employer, config.authentication.jwtSecret, {
     expiresIn: ONE_WEEK
 })
}

function jwtSignJobSeeker(jobseeker){
    const ONE_WEEK = 60*50*24*7
     return jwt.sign(jobseeker, config.authentication.jwtSecret, {
         expiresIn: ONE_WEEK
     })
}

module.exports = {
    
    async employerRegister(req, res) {
        try{
            console.log(`Employer email ${JSON.stringify(req.body)}\r\n\r\n`)

            const employer = await Employer.create(req.body)
            const emlProfile = await EmployerProfile.create({
                company: employer.company,
                EmployerId: employer.id
            })
            const employerJSON = employer.toJSON()
            const  employerProfileJSON = emlProfile.toJSON()
            console.log(employerJSON.id)
            const status = "Registration Successful! Please login to complete your Profile."
           res.send({
            employer: employerJSON,
            token: jwtSignEmployer(employerJSON),
            profile: employerProfileJSON,
            message: status,
           })
        }catch(error){
            res.status(400).send({
                error: `This email is already in use! - ${error}`
            })
        }
       
    
    },
    async jobseekerRegister(req, res) {
        try{
            console.log(`Request Body ${JSON.stringify(req.body)}`)
            console.log(`Jobseeker email ${JSON.stringify(req.body.email)}`)
            const jobseeker = await Jobseeker.create(req.body)
            const jobSeekProfile = await JobseekerProfile.create({
                JobseekerId: jobseeker.id
            })
            const  jobSeekProfileJSON = jobSeekProfile.toJSON()
            const jobseekerJSON = jobseeker.toJSON()
            const status = "Registration Successful! Please login to complete your Profile."
           res.send({
              jobseeker: jobseekerJSON,
              token:   jwtSignJobSeeker(jobseekerJSON),
              profile: jobSeekProfileJSON,
              message: status
           })
        }catch(error){
            res.status(400).send({
                error: `This email is already in use! - ${error}`
            })
        }
       
    
    },

    async employerLogin(req, res) {
        try{
            const {email, password } = req.body;
            console.log(`Employer email ${email}\r\n\r\n`)
            console.log(`Employer password ${email}\r\n\r\n`)
            const employer = await Employer.findOne({ 
                where: {
                    email: email
                }
                })
         console.log(`Employer email ${req.body.email}`)
         console.log(`Employer ${JSON.stringify(employer.toJSON())}`);
        if(!employer){
            console.log('No employer found in db');
               res.status(403).send({
                   error: 'This email or password is incorrect'
               })     
        }
      

        try{
        const isPasswordValid = await employer.comparePassword(password)
        console.log(`Hash return ${isPasswordValid}`)
        if(!isPasswordValid){
            console.log('Password is not valid');
                res.status(403).send({
                    error: 'This email or password is incorrect'
                })     
       
        }
       
        }catch(err){
         return `${err}`
        }
  
        const employerJSON = employer.toJSON()

        res.send({
               employer: employerJSON,
               token: jwtSignEmployer(employerJSON)
        })


        }catch(error){
            res.status(500).send({ error: `An error has occured to login: ${error}`})
        }
       
    
    },

    async jobseekerLogin(req, res) {
        try{
           
            const {email, password } = req.body;
            console.log(`Jobseeker email ${email}\r\n\r\n`)
            console.log(`Jobseeker password ${email}\r\n\r\n`)
            const jobseeker = await Jobseeker.findOne({ 
                where: {
                    email: email
                }
                })
         console.log(`Jobseeker email ${req.body.email}`)
         console.log(`Jobseeker ${JSON.stringify(jobseeker.toJSON())}`);
        if(!jobseeker){
            console.log('No jobseeker found in db');
               res.status(403).send({
                   error: 'This email or password is incorrect'
               })     
        }
      

        try{
        const isPasswordValid = await jobseeker.comparePassword(password)
        console.log(`Hash return ${isPasswordValid}`)
        if(!isPasswordValid){
            console.log('Password is not valid');
                res.status(403).send({
                    error: 'This email or password is incorrect'
                })     
       
        }
       
        }catch(err){
         return `${err}`
        }
  
        const jobseekerJSON = jobseeker.toJSON()

        res.send({
               jobseeker: jobseekerJSON,
               token: jwtSignJobSeeker(jobseekerJSON)
        })


        }catch(error){
            res.status(500).send({ error: `An error has occured to login: ${error}`})
        }
    }
    
    
}