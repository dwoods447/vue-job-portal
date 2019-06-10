import Api from './Api';

export default {
 getJobCategories(){
   return Api.get('/job/categories')
 },
 getJobTypes(){
   return Api.get('/job/types')
 },
 createJob(jobInfo){
  return Api.post('/employer/create/job', jobInfo)
 }
}
