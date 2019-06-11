<template>
  <div>
    <v-container>
       <v-card>
      <v-layout row wrap>
         <v-toolbar>
              Edit a Job
         </v-toolbar>
      </v-layout>
      <v-layout row wrap >
         <v-flex xs6>
           <div style="padding: 0.25em; margin: 0 auto; width: 70%;">
              <form action="">
               <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-text-field  label="Job Title" outline v-model="employersJob.jobTitle"></v-text-field>
                 </v-flex>
                 <v-flex xs6 pa-1>
                   <v-text-field  label="Location" outline  v-model="employersJob.location"></v-text-field>
                 </v-flex>
                </v-layout>
                <v-layout row wrap>
                 <v-flex xs12>
                    <v-select label="Job Type" outline :items="jobTypes" item-text="type"  v-model="type">

                    </v-select>
                 </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>

                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Category" :items="categories" item-text="name" v-model="categoryChosen">
                    </v-select>
                  </v-flex>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Status" :items="statuses">
                    </v-select>
                  </v-flex>
              </v-layout>
              <v-textarea label="Job Description" outline v-model="employersJob.description"></v-textarea>
              <v-btn color="primary" @click="updateJob">Update Job</v-btn>
            </form>
           </div>
         </v-flex> <!--  end of form flex-->

         <v-flex xs6>

                 <!-- <div style="padding: 1em;">
                 <h2>Active Jobs</h2>
                   <div>
                  <v-data-table
                    :headers="tableHeaders"
                    :items="employersJobs"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                       <td>{{ props.item.location }}</td>
                        <td>{{ props.item.createdAt | formateDate }}</td>
                    </template>
                  </v-data-table>

                </div>
             </div> -->
         </v-flex>
      </v-layout>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import JobSerivce from '../../services/JobService'
import EmployerService from '../../services/EmployerService'
export default {
  created(){
    this.getJobInfo();
    this.getCategories();
    this.getJobTypes();
  },
  data(){
    return {
      categoryChosen: '',
      type: '',

      employersJob: {
        jobTitle: '',
        location:'',
        description: '',
      },
      categories: [],
      statuses: [
        'Live',
        'Draft'
      ],
      jobTypes: [],
    }
  },
  methods: {
     async getJobInfo(){
       this.employersJob = {};
        console.log(`Getting Job info from server...`)
        // Get employer job ID from router parameter
        let jobId = this.$store.state.route.params.jobId;
        console.log(`Job ID: ${jobId}`);
        // Make request to JobService sending job :id
        let job = (await JobSerivce.viewJob(jobId)).data.data
        console.log(`Job Returned: ${JSON.stringify(job)}`);
        // Get response and check if employer object is returned and store that in the employer object if null is returned then empty employer object
        if (job === null) {
            this.employersJob = {}
        } else {
            this.employersJob = job;
            // Update the vuex store with the currentEmployer object
             // this.$store.dispatch('setCurrentEmployerAction', this.employer)
        }
    },

    async getCategories(){
       const catsReturned = await EmployerService.getJobCategories();
        this.categories = catsReturned.data.data;
        console.log(`Categories: ${JSON.stringify(this.categories[0])}`)
    },
    async getJobTypes(){
        const jobTypes = await EmployerService.getJobTypes()
        this.jobTypes = jobTypes.data.data[0];
        console.log(`Job Types: ${JSON.stringify(this.jobTypes)}`)
    },

     async updateJob(){
      // declare empty object to hold job values
         let jobObj = {};
        // Check for required values and store them in job object
        if (this.employersJob.jobTitle) jobObj.jobTitle = this.jobTitle;
        if (this.employersJob.location) jobObj.location = this.location;
        if (this.type)jobObj.type = this.type;
        if (this.status) jobObj.active = this.status;
        if (this.employersJob.description) jobObj.description = this.description;
        if (this.employersJob.apply_date) jobObj.job_ending = this.apply_date;
        let employerId = this.$store.state.route.params.employerId;
        if (employerId) jobObj.EmployerId = employerId;
        for (var cat in this.categories) {
            console.log(cat + ' ' + JSON.stringify(this.categories[cat]))
             if (this.categories[cat].name === this.categoryChosen) {
                    jobObj.JobCategoryId = this.categories[cat].id;
             }
        }
       const createdJob = await EmployerService.createJob(jobObj);
       console.log(`Created Job: ${createdJob}`);
        if (createdJob) {
            console.log(`Created a Job ${JSON.stringify(jobObj)}`)
            console.log(`Sending created job to store.`)
          this.$store.dispatch('setCreatedJobAction', jobObj)
          this.getEmployerJobs(this.$store.state.route.params.employerId);
        }
        console.log(JSON.stringify(jobObj))
    },
  }
}
</script>
