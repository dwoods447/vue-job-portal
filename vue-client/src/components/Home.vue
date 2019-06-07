<template>
      <v-container fluid grid-list-md style="max-width: 1200px;">
        <v-layout row wrap>
                <v-flex x12 justify-center>
                   <h2>Search Jobs</h2>
                   <v-layout row wrap>
                     <v-flex xs12>
                      <v-text-field outline label="Search..." append-icon ="search"
                      @input="searchJobs" v-model="search">
                      </v-text-field>
                     </v-flex>

                   </v-layout>
                   <v-layout row wrap>
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
                                      <router-link v-bind:to="{name:'view.job.detail', params: {jobId: props.item.id}}" style="    text-decoration: none;"><v-btn color="success">Apply</v-btn></router-link>
                                    </v-card-actions>
                                </v-layout>
                                </v-card>
                            </v-flex><!-- end of job-container -->
                        </template>
                      </v-data-iterator>
                      </v-flex>
                   </v-layout>
                </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
// import data from '../data'
 import JobService from '../services/JobService'
export default {
  async created () {
     this.jobs = (await JobService.viewAllJobs()).data.data;
    // console.log(`Jobs returned: ${JSON.stringify(this.jobs)}`);
  },
  mounted () {
    console.log('Component Mounted')
  },
  data: function () {
    return {
      search: '',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 10
      },
      jobs: [],
    }
  },
  methods: {
    searchJobs () {
      console.log('Searching jobs....');
      if (this.search.length > 5) {
          console.log(`Search for: ${this.search}`);
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
