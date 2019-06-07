<template>
  <div>
      <v-container>
         <v-layout row wrap>
           <v-flex xs7 class="detail-container">
              <v-card>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Company: <span v-if="company">{{company.company}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                  <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Slogan: <span v-if="company">{{company.company}}</span></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-card>
           </v-flex>
           <v-flex xs4 class="detail-container">
            <v-card>
             <img src="http://placehold.it/200x200">
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
    this.getCompanyInfo(this.$store.state.route.params.employerId);
  },
  mounted(){

  },
  data(){
    return {
      job: {},
      company: {},
    }
  },
  methods: {

    async getCompanyInfo(employerID){
      console.log('Getting job info...')
      this.company = {}
      const company = (await JobService.employerJob(employerID)).data.data
      this.company = company;
      console.log(`Employer Detail: ${JSON.stringify(company)}`)
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
