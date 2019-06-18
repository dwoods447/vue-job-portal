<template>
  <div>
     <v-container>

       <v-layout row wrap>
            <h1>View Applicants:</h1>
            <v-flex xs12 v-for="applicant in applicants.Applicant" :key="applicant.email+''+applicant.name+''+applicant.jobTitle" style="margin: 10px;">
              <v-toolbar color="primary">
                  <span class="white--text">{{ applicant.name }} - applying for <span>{{applicant.type}}</span> </span>&nbsp;<strong><span class="white--text"> {{applicant.jobTitle}}</span></strong>
              </v-toolbar>
              <v-card>
              <table>
                <tr>
                  <td v-if="applicant.photo === null"><img src="http://placehold.it/80x80" alt="No Photo"></td>&nbsp;
                  <td v-if="applicant.photo"><img :src="applicant.photo" :alt="applicant.name"></td>&nbsp;
                  <td v-if="applicant.resume">Resume: <a :href="applicant.resume">{{applicant.resume}}</a></td>&nbsp;
                  <td v-if="applicant.coverletter">Cover Letter: <a :href="applicant.coverletter">{{applicant.coverletter}}</a></td>&nbsp;
                  <td v-if="applicant.email">Email: {{applicant.email}}</td>&nbsp;
                  <td v-if="applicant.address">Address: {{applicant.address}}</td>&nbsp;
                  <td v-if="applicant.phone">Phone: {{applicant.phone}}</td>&nbsp;
                  <td v-if="applicant.gender">Gender: {{applicant.gender}}</td>&nbsp;
                </tr>
              </table>
              </v-card>
            </v-flex>

       </v-layout>
     </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
export default {
  created(){
    this.getApplicants();
  },
  mounted(){

  },
  data(){
    return {
      applicants: [],
    }
  },
  methods: {
     async getApplicants(){
        const employerId = this.$store.state.route.params.employerId
        const applicants = (await JobService.getEmployerJobApplicants(employerId)).data.data
        console.log(`Applicants: ${JSON.stringify(applicants, null, 2)}`)
        if (applicants) {
          this.applicants = applicants;
        }
     }
  }
}
</script>
