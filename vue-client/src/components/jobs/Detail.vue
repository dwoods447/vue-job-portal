<template>
  <div>
      <v-container>
         <v-layout row wrap>
           <v-flex xs9 pa-2>
              <v-card>
                <v-toolbar color="primary">
                 Job Title
                </v-toolbar>
                 <h2>Description</h2>
              </v-card>
           </v-flex>
             <v-flex xs3 pa-2>
               <v-card>
                <v-toolbar color="primary">
                 Job Details
                </v-toolbar>
                </v-card>
           </v-flex>
         </v-layout>
      </v-container>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  }
}
</script>
