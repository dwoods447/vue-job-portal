import Api from './Api'
export default {
  updateJobSeekerProfile(info){
    return Api.post('/jobseeker/profile', info)
  },
  updateEmployerProfile(info){
    return Api.post('/employer/profile', info)
  },
  getJobseekerProfile(info){
    return Api.get('/jobseeker/' + info + '/profile', info)
  },
  getEmployerProfile(id){
    return Api.get('/employer/' + id + '/profile', id)
  },
  checkJobsAppliedTo(jobseekerId){
    return Api.get(`/jobseeker/${jobseekerId}/profile/applications`)
  },
  uploadResume(jobseekerId, resume){
     return Api.post(`/jobseeker/${jobseekerId}/resume/upload`, resume)
  },
  uploadCoverLetter(jobseekerId, coverletter){
    return Api.post(`/jobseeker/${jobseekerId}/coverletter/upload`, coverletter)
  },
  uploadCompanyPhoto(employerId, photo){
    return Api.post(`/employer/${employerId}/company/photo/upload`, photo)
  },
  uploadCompanyLogo(employerId, logo){
    const formData = new FormData();
    formData.append('file', logo, logo.name)
    return Api.post(`/employer/${employerId}/company/logo/upload`, formData)
  },
}
