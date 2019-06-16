<template>
  <div>
      <v-container>
         <v-card>
           <v-toolbar color="primary">
               <div>
                 <img :src="employer.logo" style="margin-left: -25px; display: block; padding: 1em; border-radius:50%;"/>
               </div>
               <h2><span class="white--text"><span v-if="company">{{company.company}}'s</span> Company Profile</span></h2>
               <v-spacer></v-spacer>
               <h2><router-link :to="{name: 'home'}" class="white--text"> Back to Job List</router-link></h2>
           </v-toolbar>
         <v-layout row wrap>
           <v-flex xs7 class="detail-container">
             <div>
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
             </div>
              <div style="padding: 1em;">
                 <h2> Company Description: </h2>
                <p>{{employer.description}}</p>
             </div>
           </v-flex>
           <v-flex xs4 class="detail-container">
             <div style="width: 100%;">
                  <img :src="employer.coverphoto" style="width: 100%; display: block; margin: 0 auto;">
             </div>
           </v-flex>
           </v-layout>
           <v-layout row wrap>
            <v-flex xs12>
                 <div style="padding: 1em;">
                 <h2>Active Jobs</h2>
                   <div>
                  <v-data-table
                    :headers="tableHeaders"
                    :items=" company.Jobs"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                       <td>{{ props.item.location }}</td>
                        <td>{{ props.item.createdAt | formateDate }}</td>
                        <td><router-link :to="{name:'view.job.detail', params:{jobId: props.item.id}}" target='_blank'><v-btn>View job</v-btn></router-link></td>
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
import JobService from '../../services/JobService'
import ProfileService from '../../services/ProfileService';
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
      pagination: {
        pages: 1
      },
      tableHeaders: [
        {text: 'Position/Type'},
        {text: 'Location'},
        {text: 'Date Posted'},
      ]
    }
  },
  methods: {

    async getCompanyInfo(employerID){
      console.log('Getting job info...')
      this.company = {}
      let company = (await JobService.employerJob(employerID)).data.data
      let employer = (await ProfileService.getEmployerProfile(employerID)).data.data
      this.company = company;
      this.employer = employer;
       console.log(`Employer Detail: ${JSON.stringify(company)}`)
       console.log(`Employer Profile Details: ${JSON.stringify(employer)}`)
    }
  },
  computed: {
        pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
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
