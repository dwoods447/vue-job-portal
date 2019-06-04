import Api from './Api'
export default {
  updateJobSeekerProfile(info){
    return Api.post('/jobseeker/profile', info)
  },
  updateEmployerProfile(info){
    return Api.post('/employer/profile', info)
  },
}
