<template>
     <div>
      <v-parallax src="https://images.unsplash.com/photo-1423655156442-ccc11daa4e99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
      <v-layout
      align-left
      column
      justify-center
      style="margin-top: -150px;"
    >
      <h1 class="display-2 font-weight-thin mb-3 blue--text"><strong>Online Job Portal</strong></h1>
      <h4 class="subheading blue--text"><strong>Applicants Post your resume, and Submit your application today!</strong></h4>
        <h4 class="subheading blue--text"><strong>Employers, Post a job, Find the perfect Applicant</strong></h4>
    </v-layout>
      </v-parallax>
      <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@anthonydelanoix?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Anthony DELANOIX"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Anthony DELANOIX</span></a>

      <v-container fluid grid-list-md  ref="formContainer">
        <v-layout row wrap>
              <v-flex xs12 style="max-width: 1200px; margin: 0 auto;">
                <h2>Search Jobs</h2>
                <v-text-field outline label="Search..." append-icon ="search"
                 @keyup="searchJobs" v-model="search">
                </v-text-field>
              </v-flex>
               <v-flex x12 justify-center style="max-width: 1200px; margin: 0 auto;">
                  <v-data-iterator
                    :items="jobs"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    content-tag="v-layout"
                    row
                    wrap
                    >
                      <template v-slot:item="props">
                          <v-flex xs12  class="job-container">
                              <v-toolbar color="primary">
                                <div>
                                  <img :src="props.item.Employer.EmployerProfile.logo" style="margin-left: -25px; display: block; padding: 1em; border-radius:50%;"/>
                                </div>
                                <div>
                                  <h2><span class="white--text">{{ props.item.jobTitle}}</span></h2>
                                  <div class="white--text">at {{props.item.Employer.company}} - near {{props.item.location}}</div>
                                </div>
                                <v-spacer style="width: 50%;"></v-spacer>
                                  <span class="yellow--text"><strong>{{props.item.type}}</strong></span>
                              </v-toolbar>
                                <v-card>
                                  <div style="padding: 1em;">
                                    <span >{{props.item.description.substring(0, (props.item.description.length/4))}}...</span>
                                  </div>
                                  <v-layout justify-end>
                                    <v-card-actions justify-right>
                                        <router-link v-bind:to="{name:'view.job.detail', params: {jobId: props.item.id}}" style="text-decoration: none;" v-if="!$store.state.isEmployerLoggenIn"><v-btn color="success">Apply</v-btn></router-link>
                                      </v-card-actions>
                                  </v-layout>
                                </v-card>
                            </v-flex><!-- end of job-container -->
                        </template>
                      </v-data-iterator>
               </v-flex>
                <v-flex xs12>
                        <h2>Featured Companies</h2>
                        <v-layout row wrap>
                            <v-flex xs4 v-for="company in featured_companies" :key="company.id">
                                <v-card>
                                  <div v-if="company.coverphoto">
                                    <v-img
                                    :src="company.coverphoto"
                                    aspect-ratio="2.75"
                                  ></v-img>
                                  </div>
                                  <div v-else>
                                    <v-img
                                    src="http://placehold.it/450x450"
                                    aspect-ratio="2.75"
                                  ></v-img>
                                  </div>


                                  <v-card-title primary-title>
                                    <div>
                                      <h1 class="headline mb-0">{{company.company}}</h1>
                                    </div>
                                  </v-card-title>

                                  <v-card-actions>
                                    <router-link :to="{name:'view.employer.detail', params:{employerId: company.id}}" style="text-decoration: none;"><v-btn color="orange" >View Company</v-btn></router-link>
                                  </v-card-actions>
                                </v-card>
                            </v-flex>

                        </v-layout>
                </v-flex><!--  end of companies-->
                <!-- <v-flex xs12>
                      <v-layout row wrap>
                          <v-flex style="max-width: 1200px; margin: 0 auto;" justify-center>
                            <h2>Subscribe to our newsletter</h2>
                             <h4>Get the best of our listings into your inbox. Issued weekly.</h4>
                              <v-flex xs6 sm6 md6>
                                  <v-text-field
                                    label="Outline"
                                    placeholder="Placeholder"
                                    outline
                                  ></v-text-field>
                                </v-flex>
                                 <v-flex xs6 sm6 md6>
                                  <v-text-field
                                    label="Outline"
                                    placeholder="Placeholder"
                                    outline
                                  ></v-text-field>
                                </v-flex>
                          </v-flex>
                      </v-layout>
                </v-flex> -->
        </v-layout>
    </v-container>
    </div>
</template>
<script>
// import data from '../data'
import Vue from 'vue'
import JobService from '../services/JobService'
import EmployerService from '../services/EmployerService'
import LoadingOverlay from 'vue-loading-overlay'
Vue.use(LoadingOverlay)
export default {
  created () {
    this.getAllJobs();
    this.getFeaturedCompanies();
  },
  mounted () {
    console.log('Component Mounted')
  },
  data: function () {
    return {
      search: '',
      isLoading: false,
      fullPage: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 8
      },
      jobs: [],
      card_text: 'Sample Text',
      featured_companies: [],
    }
  },
  methods: {
    async getFeaturedCompanies(){
       this.featured_companies = [];
       this.featured_companies = (await EmployerService.getFeaturedCompanies()).data.data
       // console.log(`Featured Companies returned: ${JSON.stringify(this.featured_companies)}`);
    },
    async getAllJobs(){
          this.jobs = [];
          this.jobs = (await JobService.viewAllJobs()).data.data;
          // console.log(`Jobs returned: ${JSON.stringify(this.jobs, null, 2)}`);
    },
    async searchJobs () {
      console.log('Searching jobs....');
      if (this.search.length > 5) {
          let loader = this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
          });
          console.log(`Search for: ${this.search}`);
          this.jobs = (await JobService.searchJob(this.search)).data.data
          if (this.jobs) {
             loader.hide()
           // console.log(JSON.stringify(`Jobs returned: ${JSON.stringify(this.jobs)}`))
          } else {
            // console.log(JSON.stringify(`No jobs returned: ${JSON.stringify(this.jobs)}`))
              loader.hide()
          }
      }
      if (this.search.length < 4) {
          this.getAllJobs();
      }
    }
  },
  computed: {

  }
}
</script>
<style>
.job-container{
  margin: 7px;
}
</style>
