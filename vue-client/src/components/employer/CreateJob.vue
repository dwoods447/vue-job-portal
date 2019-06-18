<template>
  <div>
    <v-container>
       <v-card>
      <v-layout row wrap>
         <v-toolbar>
               Post a Job
         </v-toolbar>
      </v-layout>
      <v-layout row wrap >
         <v-flex xs6>
           <div style="padding: 0.25em; margin: 0 auto; width: 70%;">
              <form action="">
               <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-text-field  label="Job Title" outline v-model="jobTitle"></v-text-field>
                 </v-flex>
                 <v-flex xs6 pa-1>
                   <v-text-field  label="Location" outline  v-model="location"></v-text-field>
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
                           <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="apply_date"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="apply_date"
                                  label="Last Date To Apply"
                                  readonly
                                  outline
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="apply_date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(apply_date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
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
              <v-textarea label="Job Description" outline v-model="description"></v-textarea>
              <v-btn color="primary" @click="createJob">Create Job</v-btn>
            </form>
           </div>
         </v-flex> <!--  end of form flex-->

         <v-flex xs6 v-if="employersJobs">

                 <div style="padding: 1em;">
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
                        <td><router-link :to="{name:'edit.employer.job', params:{jobId: props.item.id} }"><v-btn>Edit</v-btn></router-link></td>
                          <td><v-btn @click="removeJob(props.item.id)">Remove</v-btn></td>
                    </template>
                  </v-data-table>
                  <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                  </div> -->
                </div>
             </div>
         </v-flex>
      </v-layout>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import EmployerService from '../../services/EmployerService'
import moment from 'moment'
export default {
  created(){
    this.getCategories();
    this.getJobTypes();
    this.getEmployerJobs(this.$store.state.route.params.employerId);
  },
  mounted(){

  },
  data(){
    return {
      categories: [],
      jobTypes: [],
      statuses: [
        'Live',
        'Draft'
      ],
      apply_date: new Date().toISOString().substr(0, 10),
      menu: false,
      jobTitle: '',
      location: '',
      type: '',
      categoryChosen: '',
      status: '',
      description: '',
      employersJobs: [],
      tableHeaders: [
        {text: 'Position/Type', value:'Position/Type'},
        {text: 'Location', value: 'Location'},
        {text: 'Date Posted', value:'Date Posted'},
      ],
       pagination: {
        pages: 1
      },
    }
  },
  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  },
  methods: {
    async removeJob(jobId){
      try {
      if (jobId) {
         console.log(`Removing Job Id: ${jobId}`);
          let response = confirm('Are you sure you want to make this job inactive? This Cannot Be Undone.');
          if (response) {
                const deletedJob = (await EmployerService.deleteJob(jobId)).data;
                console.log(JSON.stringify(deletedJob))
                if (deletedJob.success) {
                    console.log(`Job was sucessfully deleted`);
                } else {
                  console.log(`There was an error deleting the job`)
                }
          }
        }
      } catch (error) {
         console.log(`Error: ${error}`)
      }
    },
    async createJob(){
      // declare empty object to hold job values
         let jobObj = {};
        // Check for required values and store them in job object
        if (this.jobTitle) jobObj.jobTitle = this.jobTitle;
        if (this.location) jobObj.location = this.location;
        if (this.type)jobObj.type = this.type;
        if (this.status) jobObj.active = this.status;
        if (this.description) jobObj.description = this.description;
        if (this.apply_date) jobObj.job_ending = this.apply_date;
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
           // console.log(`Created a Job ${JSON.stringify(jobObj)}`)
           // console.log(`Sending created job to store.`)
       //   this.$store.dispatch('setCreatedJobAction', jobObj)
          this.getEmployerJobs(this.$store.state.route.params.employerId);
        }
        console.log(JSON.stringify(jobObj))
    },
    async getCategories(){
       const catsReturned = await EmployerService.getJobCategories();
        this.categories = catsReturned.data.data;
       // console.log(`Categories: ${JSON.stringify(this.categories[0])}`)
    },
    async getJobTypes(){
        const jobTypes = await EmployerService.getJobTypes()
        this.jobTypes = jobTypes.data.data[0];
       // console.log(`Job Types: ${JSON.stringify(this.jobTypes)}`)
    },

    async getEmployerJobs(employerId){
      this.employersJobs = [];
      const employerJobs = (await EmployerService.getEmployerJobs(employerId)).data.data;
      this.employersJobs = employerJobs;
      // console.log(`Employers Jobs ${JSON.stringify(this.employersJobs)}`);
    }
  }
}
</script>
