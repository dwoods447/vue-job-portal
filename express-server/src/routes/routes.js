const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileController = require('../controllers/ProfileController')
module.exports = (app)  =>{
    app.get('/', (req, res)=>{
        res.send('This is the server start page')
    })

    app.get('/jobseeker/profile', ProfileController.getProfileInfo)
    app.post('/employer/login', AuthenticationController.employerLogin)
    app.post('/jobseeker/login', AuthenticationController.jobseekerLogin)
    app.post('/employer/register', AuthenticationController.employerRegister)
    app.post('/jobseeker/register', AuthenticationController.jobseekerRegister)
    app.post('/employer/profile/', ProfileController.updateEmployerProfile)
    app.post('/jobseeker/profile/', ProfileController.updateJobseekerProfile)
    
}