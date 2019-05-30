import Vue from 'vue'
import './plugins/vuetify'
import App from './App'

import VueRouter from 'vue-router';
import AppilcationProfile from './components/profiles/applicant/ApplicantProfile';
import JobSeekerRegistration from './components/registration/JobSeekerRegistration.vue';
import BrowseJobs from './components/jobs/BrowseJobs';

Vue.config.productionTip = false;
Vue.use(VueRouter);
const routes = [
  { path:'/jobseeker-profile', component: AppilcationProfile },
  { path:'/jobseeker-registration', component: JobSeekerRegistration },
  { path:'/jobs/all', component: BrowseJobs}
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({ el: '#app', router, render: h => h(App) })