const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileController = require('../controllers/ProfileController');
const JobController = require('../controllers/JobController');
module.exports = (app)  =>{
    app.get('/', (req, res)=>{
        res.send('This is the server start page')
    })

    app.get('/jobseeker/:jobseekerId/profile', ProfileController.getProfileInfo)
    app.post('/employer/login', AuthenticationController.employerLogin)
    app.post('/jobseeker/login', AuthenticationController.jobseekerLogin)
    app.post('/employer/register', AuthenticationController.employerRegister)
    app.post('/jobseeker/register', AuthenticationController.jobseekerRegister)
    app.post('/employer/profile/', ProfileController.updateEmployerProfile)
    app.post('/jobseeker/profile/', ProfileController.updateJobseekerProfile)
    app.get('/jobs/all', JobController.viewAllJobs)
    app.get('/job/search/:value', JobController.searchJob)
    app.get('/job/:jobId/detail', JobController.viewJob)
    app.get('/employer/job/:employerId/detail', JobController.employerJob)
}