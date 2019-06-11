<template>
      <v-container fluid grid-list-md style="max-width: 1200px;" ref="formContainer">
        <v-layout row wrap>
              <v-flex xs12>
                          <h2>Search Jobs</h2>
                            <v-text-field outline label="Search..." append-icon ="search"
                              @input="searchJobs" v-model="search">
                            </v-text-field>
              </v-flex>
               <v-flex x12 justify-center>
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
                                  <div class="white--text">at {{props.item.company}} - {{props.item.location}}</div>
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

        </v-layout>
    </v-container>
</template>
<script>
// import data from '../data'
import Vue from 'vue'
import JobService from '../services/JobService'
import LoadingOverlay from 'vue-loading-overlay'
Vue.use(LoadingOverlay)
export default {
  created () {
    this.getAllJobs();
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
    }
  },
  methods: {
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
            console.log(JSON.stringify(`Jobs returned: ${JSON.stringify(this.jobs)}`))
          } else {
             console.log(JSON.stringify(`No jobs returned: ${JSON.stringify(this.jobs)}`))
              loader.hide()
          }
      }
      if (this.search.length < 2) {
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
