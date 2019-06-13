<template>
      <v-container fluid grid-list-md  ref="formContainer">
        <v-layout row wrap>
              <v-flex xs12>
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
                                  <v-img
                                    :src="company.coverphoto"
                                    aspect-ratio="2.75"
                                  ></v-img>

                                  <v-card-title primary-title>
                                    <div>
                                      <h3 class="headline mb-0">{{company.company}}</h3>
                                    </div>
                                  </v-card-title>

                                  <v-card-actions>
                                    <router-link :to="{name:'view.employer.detail', params:{employerId: company.id}}"><v-btn flat color="orange">View Company</v-btn></router-link>
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
       console.log(`JCompanies returned: ${JSON.stringify(this.featured_companies)}`);
    },
    async getAllJobs(){
          this.jobs = [];
          this.jobs = (await JobService.viewAllJobs()).data.data;
         // console.log(`Jobs returned: ${JSON.stringify(this.jobs)}`);
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
