<template>
  <div>
      <v-container>
         <v-layout row wrap>
           <v-flex xs9 pa-2>
              <v-card>
                <v-toolbar color="primary">
                <div>
                 <h2 v-if="job" class="white--text">{{job.jobTitle}}</h2>
                   <div class="white--text">at {{ company.company }} - </div>
                </div>
                </v-toolbar>

                <div style="padding: 1em;">
                  <h2>Description</h2>
                 <p v-if="job" >{{job.description}}</p>
                </div>
              </v-card>
           </v-flex>
             <v-flex xs3 pa-2>
               <v-card>
                <v-toolbar color="primary" class="white--text">
                 Job Details
                </v-toolbar>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title><router-link :to="{name:'view.employer.detail', params: {employerId: company.id}}" v-if="company.id"><span>Visit Company Page</span></router-link></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Location: <span v-if="job">{{job.location}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Type: <span v-if="job">{{job.type}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Job Posted: <span v-if="job">{{job.createdAt | formateDate }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>



                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Last Date To Apply: <span v-if="job">{{job.job_ending | formateDate }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>


                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{company.company}} Representative: <span>{{ company.representative }}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>




                 <v-list-tile v-if="!this.$store.state.isJobseekerLoggenIn">
                  <v-list-tile-content>
                    <v-list-tile-title><span style="color: red;"><strong>To Apply Please Login In</strong></span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <div v-if="this.$store.state.isJobseekerLoggenIn && !alreadyApplied">
                 <v-list-tile>
                    <v-list-tile-content>
                        <div  class="justify-center text-xs-center">
                          <a href="javascript:void(0);" style="text-decoration: none;" justify-center @click="applyForJob"><v-btn color="success" style="min-width: 200px;">Apply</v-btn></a>
                        </div>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </div>


                 <v-list-tile v-if="this.$store.state.isJobseekerLoggenIn && alreadyApplied">
                  <v-list-tile-content>
                    <div class="green--text">
                       <v-list-tile-title class="text-xs-center"><strong><span>You've Already Applied</span></strong></v-list-tile-title>
                    </div>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                </v-card>
           </v-flex>
         </v-layout>
      </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
import moment from 'moment'
export default {
  created(){
    this.getJobInfo();
    this.checkExisitingJobApplication();
  },
  mounted(){

  },
  data(){
    return {
      job: {},
      company: {},
      alreadyApplied: false,
    }
  },
  methods: {
    async getJobInfo(){
      this.job = {};
       const jobId = this.$store.state.route.params.jobId;
      // console.log(`Route params: ${jobId}`);
       let job = (await JobService.viewJob(jobId)).data.data;
       // console.log(JSON.stringify(job))
       this.job = job;
       // console.log(`Setting job : ${JSON.stringify(this.job)}`)
       this.getCompanyInfo(job.EmployerId);
    },

    async getCompanyInfo(employerID){
      this.company = {}
      const company = (await JobService.employerJob(employerID)).data.data
      this.company = company;
      // console.log(JSON.stringify(company))
    },

    async applyForJob(){
      let jobseekerId = this.$store.state.jobseeker.id;
      let jobId = this.$store.state.route.params.jobId;
      const applied = (await JobService.applyForJob(jobseekerId, jobId))
          if (applied) {
              console.log(`Application sent successfully: ${applied}`)
          } else {
              console.log(`Application was not sent: ${applied}`)
          }
          this.checkExisitingJobApplication();
    },
    async checkExisitingJobApplication(){
      console.log(`Checking for application...`)
      let jobId = this.$store.state.route.params.jobId;
      if (this.$store.state.jobseeker) {
       let jobseekerId = this.$store.state.jobseeker.id;
       const applied = (await JobService.checkJobApplication(jobseekerId, jobId)).data.data
          if (applied && applied !== null) {
              console.log(`You have already applied to this job: ${JSON.stringify(applied)}`)
              this.alreadyApplied = true;
          } else {
              console.log(`You have never applied to this job: ${JSON.stringify(applied)}`)
          }
      }
    }
  },
  computed: {

  },

  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  }

}
</script>
