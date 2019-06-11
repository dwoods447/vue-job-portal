const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
const EmployerController = require('../controllers/EmployerController')
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
    app.get('/employer/:employerId/jobs', EmployerController.getEmployerJobs)


    /***** Job ****/   
    // Get all jobs
    app.get('/jobs/all', JobController.viewAllJobs)
    // Search for specific job
    app.get('/job/search/:value', JobController.searchJob)
    // Get individual job details, 
    app.get('/job/:jobId/detail', JobController.viewJob)
    // Get individual company details
    app.get('/employer/job/:employerId/detail', JobController.employerJob)

    
}