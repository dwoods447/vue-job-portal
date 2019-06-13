const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const EmployerController = require('../controllers/EmployerController');
// const { EmployerProfile } = require('../models')
const multer = require('multer');
const jobseeker = multer({
    dest: '../uploads/jobseeker/'
})

const employer = multer({
    dest: '../uploads/employer/'
})

module.exports = (app)  =>{
   
   
    app.get('/', (req, res)=>{
        res.send('This is the server start page')
    })

 /**** Job Seeker ****/
    // Get employer profile info
    app.get('/jobseeker/:jobseekerId/profile', ProfileController.getJobSeekerProfileInfo)
    // Update jobseeker profile info 
    app.post('/jobseeker/profile/', ProfileController.updateJobseekerProfile)
    // Send employer login credentials
    app.post('/jobseeker/login', AuthenticationController.jobseekerLogin)
    // Send jobseeker registration info
    app.post('/jobseeker/register', AuthenticationController.jobseekerRegister)
    app.post('/jobseeker/:jobseekerId/job/:jobId/apply', JobController.applyforJob)
    app.get('/check/jobseeker/:jobseekerId/job/:jobId/application', JobController.checkJobSeekerApplication)
    app.get('/jobseeker/:jobseekerId/profile/applications', ProfileController.getJobAppliedFor)
   
    
 /**** Employer ****/
    // Get employer profile info
    app.get('/employer/:employerId/profile', ProfileController.getEmployerProfileInfo)
    // Send employer login credentials
    app.post('/employer/login', AuthenticationController.employerLogin)
    // Send employer registration info
    app.post('/employer/register', AuthenticationController.employerRegister)
    // Update employer profile info
    app.post('/employer/profile/', ProfileController.updateEmployerProfile)
    
    app.get('/job/categories', EmployerController.getCategories)
    app.get('/job/types', EmployerController.getJobTypes)
    app.post('/employer/create/job', EmployerController.createJob)
    app.post('/employer/update/job', EmployerController.updateJob)
    app.get('/employer/:employerId/jobs', EmployerController.getEmployerJobs)
    app.get('/employer/featured/companies', EmployerController.getFeaturedCompanies)  
    app.get(`/employer/:employerId/job/applicants`, EmployerController.getJobApplicants)

    /***** Job ****/   
    // Get all jobs
    app.get('/jobs/all', JobController.viewAllJobs)
    // Search for specific job
    app.get('/job/search/:search', JobController.searchJob)
    // Get individual job details, 
    app.get('/job/:jobId/detail', JobController.viewJob)
    // Get individual company details
    app.get('/employer/job/:employerId/detail', JobController.employerJob)

    // Uploads
        app.post('/jobseeker/:jobseekerId/resume/upload', jobseeker.single('file'), function(req, res){
                res.send({
                    file: req.file
                })
        })
        
        app.post('/jobseeker/:jobseekerId/coverletter/upload', jobseeker.single('file'), function(req,  res){ 
            res.send({
             data: 'Cover Letter uploaded',
             file: req.body   
            })
        })
        app.post('/employer/:employerId/company/photo/upload', employer.single('file'), function(req,  res){ 
            res.send({
                data: 'Photo uploaded',
                file: req.body 
                })
        })
        app.post('/employer/:employerId/company/logo/upload', employer.single('file') ,function(req,  res){ 
            let regex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf|.txt)$/i
            let originalFilename = req.file.originalname;
            let position = originalFilename.search(regex)
            let ext = originalFilename.substr(0, position)
            // const logoSaved = EmployerProfile.update({
            //     logo: req.file.destination +  req.file.filename
            // })
            console.log(`Original File name: ${JSON.stringify(originalFilename)}`);
            console.log(`Position: ${JSON.stringify(position)}`)
            console.log(`Extension: ${JSON.stringify(ext)}`)
            res.json({
                file: ext
           })  
        })
}