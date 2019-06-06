import Api from './Api';


export default {
    viewAllJobs(){
     return Api.get('/jobs/all')
    },
    viewJob(id){
      return Api.get('/job/' + id)
    },
    searchJob(value){
      return Api.get('/job/search' + value)
    }
}

