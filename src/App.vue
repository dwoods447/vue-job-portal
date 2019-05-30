<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Online Job Portal </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
<div class="text-xs-center">
 <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Employer
        </v-btn>
      </template>
      <v-list>
        <v-list-tile>
          <v-list-tile-title><router-link to="/jobseeker-profile">   Employer Profile  </router-link> </v-list-tile-title>
        </v-list-tile>
       <v-list-tile>
          <v-list-tile-title><router-link to="/jobseeker-registration">Employer Registration</router-link></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</div>
 <div class="text-xs-center">
    
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Job Seeker
        </v-btn>
      </template>
      <v-list>
         <v-list-tile>
          <v-list-tile-title><router-link to="/jobs/all">   Browse Jobs  </router-link> </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title><router-link to="/jobseeker-profile">   Job Seeker Profile  </router-link> </v-list-tile-title>
        </v-list-tile>
       <v-list-tile>
          <v-list-tile-title><router-link to="/jobseeker-registration">Job Seeker Registration</router-link></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>


    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
    </v-content>

    <v-content>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
