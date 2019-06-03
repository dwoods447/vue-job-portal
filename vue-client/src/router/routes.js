import Home from '../components/Home'
import EmployerLogin from '../components/authentication/EmployerLogin'
import JobSeekerLogin from '../components/authentication/JobseekerLogin'
import EmployerRegistration from '../components/employer/Register'
import JobSeekerRegistration from '../components/jobseeker/Register'
import EditJobSeekerProdile from '../components/jobseeker/profile/Edit'
const routes = [
  {path: '/', component: Home},
  {path: '/employer/login', component: EmployerLogin, name:'employer.login'},
  {path: '/jobseeker/login', component: JobSeekerLogin, name:'jobseeker.login'},
  {path: '/employer/registration', component: EmployerRegistration, name:'employer.registration'},
  {path: '/jobseeker/registration', component: JobSeekerRegistration, name:'jobseeker.registration'},
  {path: '/jobseeker/profile', component: EditJobSeekerProdile, name:'edit.jobseeker.profile'}
]

export default routes
