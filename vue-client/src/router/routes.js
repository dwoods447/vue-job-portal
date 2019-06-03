import Home from '../components/Home'
import EmployerLogin from '../components/authentication/EmployerLogin'
import JobSeekerLogin from '../components/authentication/JobseekerLogin'
import EmployerRegistration from '../components/employer/Register'
import JobSeekerRegistration from '../components/jobseeker/Register'
import EditJobSeekerProdile from '../components/jobseeker/profile/Edit'
import EmployerProfile from '../components/employer/profile/Profile.vue'
import JobseekerProfile from '../components/jobseeker/profile/Profile'

const routes = [
  {path: '/', component: Home, name:'home'},
  {path: '/employer/login', component: EmployerLogin, name:'employer.login'},
  {path: '/jobseeker/login', component: JobSeekerLogin, name:'jobseeker.login'},
  {path: '/employer/registration', component: EmployerRegistration, name:'employer.registration'},
  {path: '/jobseeker/registration', component: JobSeekerRegistration, name:'jobseeker.registration'},
  {path: '/edit/:jobseekerId/jobseeker/profile', component: EditJobSeekerProdile, name:'edit.jobseeker.profile'},
  {path: '/employer/:employerId/profile/', component: EmployerProfile, name: 'view.employer.profile'},
  {path: '/jobseeker/:jobseekerId/profile/', component: JobseekerProfile, name: 'view.jobseeker.profile'}
]

export default routes
