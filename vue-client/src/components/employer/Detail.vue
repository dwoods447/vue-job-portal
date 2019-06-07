<template>
  <div>
      <v-container>
         <v-card>
         <v-layout row wrap>
           <v-flex xs7 class="detail-container">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Company: <span v-if="company">{{company.company}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Slogan: <span v-if="employer">{{employer.slogan}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Address: <span v-if="employer">{{employer.address}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Phone: <span v-if="employer">{{employer.phone}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                 <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Website: <span v-if="employer">{{employer.website}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
           </v-flex>
           <v-flex xs4 class="detail-container">
             <img src="http://placehold.it/200x200">
           </v-flex>
           <v-flex xs12>
             <div style="padding: 1em;">
                 <h2> Company Description: </h2>
                <p>{{employer.description}}</p>
             </div>
           </v-flex>
            <v-flex xs12>
                 <div style="padding: 1em;">
                 <h2>Active Jobs</h2>
                 <table>
                   <thead>
                    <tr>
                     <th></th>
                     <th></th>
                     <th></th>
                   </tr>
                   </thead>
                   <tbody>
                     <tr v-for="job in company.Jobs" :key="job.id">
                       <td>
                         {{job.jobTitle}}<br/>
                          {{job.type}}
                       </td>
                       <td>{{job.location}}</td>
                       <td>{{job.createdAt}}</td>
                     </tr>
                   </tbody>
                 </table>
             </div>
            </v-flex>
         </v-layout>
         </v-card>
      </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
import ProfileSerivce from '../../services/ProfileSerivce';
import moment from 'moment'
export default {
  created(){
    this.getCompanyInfo(this.$store.state.route.params.employerId);
  },
  mounted(){

  },
  data(){
    return {
      job: {},
      company: {},
      employer: {},
    }
  },
  methods: {

    async getCompanyInfo(employerID){
      console.log('Getting job info...')
      this.company = {}
      let company = (await JobService.employerJob(employerID)).data.data
      let employer = (await ProfileSerivce.getEmployerProfile(employerID)).data.data
      this.company = company;
      this.employer = employer;
       console.log(`Employer Detail: ${JSON.stringify(company)}`)
       console.log(`Employer Profile Details: ${JSON.stringify(employer)}`)
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
<style>
  .detail-container{
    margin: 7px;
  }
</style>
