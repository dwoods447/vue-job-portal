import Api from './Api';


export default {
    viewAllJobs(){
     return Api.get('/jobs/all')
    },
    viewJob(id){
      return Api.get('/job/' + id + '/detail')
    },
    searchJob(value){
      return Api.get('/job/search' + value)
    },
    employerJob(id){
      return Api.get('/employer/job/' + id + '/detail')
    }
}

