<template>
  <div>
    <v-container>
      <v-layout row wrap>
         <v-toolbar>
               Post a Job
         </v-toolbar>
      </v-layout>
      <v-layout row wrap>
         <v-flex xs6>
           <div style="padding: 0.25em;">
              <form action="">
               <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-text-field  label="Job Title" outline></v-text-field>
                 </v-flex>
                 <v-flex xs6 pa-1>
                   <v-text-field  label="Location" outline></v-text-field>
                 </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                  <v-text-field  label="Company" outline></v-text-field>
                 </v-flex>
                 <v-flex xs12>
                    <v-select label="Job Type" outline>

                    </v-select>
                 </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Category" :items="categories">
                    </v-select>
                  </v-flex>
                  <v-flex xs6 pa-1>
                    <v-select outline label="Status" :items="statuses">
                    </v-select>
                  </v-flex>
              </v-layout>
              <v-textarea label="" outline></v-textarea>
            </form>
           </div>
         </v-flex>
         <v-flex xs6>

         </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  created(){

  },
  methods(){

  },
  data(){
    return {
      categories: [],
      statuses: [
        'Live',
        'Draft'
      ]
    }
  },
  methods: {

  }
}
</script>
