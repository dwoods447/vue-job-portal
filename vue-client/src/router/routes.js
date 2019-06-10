import Home from '../components/Home'
import EmployerLogin from '../components/authentication/EmployerLogin'
import JobSeekerLogin from '../components/authentication/JobseekerLogin'
import EmployerRegistration from '../components/employer/Register'
import JobSeekerRegistration from '../components/jobseeker/Register'
import EmployerProfile from '../components/employer/profile/Profile.vue'
import JobseekerProfile from '../components/jobseeker/profile/Profile'
import JobDetail from '../components/jobs/Detail.vue'
import EmployerDetail from '../components/employer/Detail'
import EmployerPostJob from '../components/employer/CreateJob'

const routes = [
  {path: '/', component: Home, name:'home'},
  {path: '/employer/login', component: EmployerLogin, name:'employer.login'},
  {path: '/jobseeker/login', component: JobSeekerLogin, name:'jobseeker.login'},
  {path: '/employer/registration', component: EmployerRegistration, name:'employer.registration'},
  {path: '/jobseeker/registration', component: JobSeekerRegistration, name:'jobseeker.registration'},
  {path: '/employer/:employerId/profile/', component: EmployerProfile, name: 'view.employer.profile'},
  {path: '/jobseeker/:jobseekerId/profile/', component: JobseekerProfile, name: 'view.jobseeker.profile'},
  {path: '/job/:jobId/detail', component: JobDetail, name:'view.job.detail'},
  {path: '/employer/:employerId/detail', component: EmployerDetail, name:'view.employer.detail'},
  {path: '/employer/:employerId/create/job', component:  EmployerPostJob, name:'employer.post.job'}
]

export default routes
