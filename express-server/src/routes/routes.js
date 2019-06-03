const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = (app)  =>{
    app.get('/', (req, res)=>{
        res.send('This is the server start page')
    })
    app.post('/employer/login', AuthenticationController.employerLogin)
    app.post('/jobseeker/login', AuthenticationController.jobseekerLogin)
    app.post('/employer/register', AuthenticationController.employerRegister)
    app.post('/jobseeker/register', AuthenticationController.jobseekerRegister)
  
    
}