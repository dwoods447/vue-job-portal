import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    employer: null,
    jobseeker: null,
    currentJobSeeker: null,
    isEmployerLoggenIn: false,
    isJobseekerLoggenIn: false,
  },
  mutations: {
    setEmployerTokenMutation(state, token){
      state.token = token;
      if (token){
        state.isEmployerLoggenIn = true;
      } else {
        state.isEmployerLoggenIn = false;
      }
    },
    setJobseekerTokenMutation(state, token){
      state.token = token;
      if (token){
        state.isJobseekerLoggenIn = true;
      } else {
        state.isJobseekerLoggenIn = false;
      }
    },
    setEmployerMutation(state, employer){
      state.employer = employer;
    },
    setJobseekerMutation(state, jobseeker){
      state.jobseeker = jobseeker;
    },
    setCurrentJobseekerMutation(state, jobseeker){
      state.currentJobSeeker = jobseeker;
    },
    setEmployerLogOutMutation(state){
      state.isEmployerLoggenIn = false;
      state.token = null;
    },
    setJobseekerLogOutMutation(state){
      state.isJobseekerLoggenIn = false;
      state.token = null;
    }
  },
  getters: {

  },
  actions: {
    setEmployerTokenAction(context, token){
      context.commit('setEmployerTokenMutation', token)
    },
    setJobseekerTokenAction(context, token){
      context.commit('setJobseekerTokenMutation', token)
    },
    setEmployerAction(context, employer){
      context.commit('setEmployerMutation', employer)
    },
    setJobseekerAction(context, jobseeker){
      context.commit('setJobseekerMutation', jobseeker)
    },
    setCurrentJobseekerAction(context, jobseeker){
      context.commit('setCurrentJobseekerMutation', jobseeker)
    },
    setEmployerLogOutAction(context){
      context.commit('setEmployerLogOutMutation');
    },
    setJobseekerLogOutAction(context){
      context.commit('setJobseekerLogOutMutation');
    }
  }

})
export default store
