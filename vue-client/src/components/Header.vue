<template>
  <div>
  <v-toolbar>
      <v-toolbar-title>Online Job Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      <v-menu offset-y v-if="!$store.state.isJobseekerLoggenIn">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            flat
          >
            <span v-if="!$store.state.isEmployerLoggenIn">Employer</span>
            <span  v-if="$store.state.isEmployerLoggenIn">{{$store.state.employer.company}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-if="!$store.state.isEmployerLoggenIn && !$store.state.isJobseekerLoggenIn">
            <v-list-tile-title><a  href="javascript:void(0)" @click="navigateTo({name: 'employer.login'})">Employer Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="!$store.state.isEmployerLoggenIn && !$store.state.isJobseekerLoggenIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo({name: 'employer.registration'})">Employer Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="$store.state.isEmployerLoggenIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo({name: ''})">Employer Profile</a></v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-menu>
      <v-menu offset-y v-if="!$store.state.isEmployerLoggenIn">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            flat
          >
          <span v-if="!$store.state.isJobseekerLoggenIn">Jobseeker</span>
          <span  v-if="$store.state.isJobseekerLoggenIn">{{$store.state.jobseeker.name}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile >
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo({name: 'jobseeker.login'})" v-if="!$store.state.isJobseekerLoggenIn">Jobseeker Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile>
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo({name: 'jobseeker.registration'})" v-if="!$store.state.isJobseekerLoggenIn">Jobseeker Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile>
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo({name: ''})" v-if="$store.state.isJobseekerLoggenIn">Jobseeker Profile</a></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
        <v-btn
            color="primary"
            dark
            flat
           v-if="$store.state.isEmployerLoggenIn || $store.state.isJobseekerLoggenIn" @click="logout($store.state.isEmployerLoggenIn, $store.state.isJobseekerLoggenIn)">
          Log Out
          </v-btn>
      </v-toolbar-items>
  </v-toolbar>
  </div>
</template>
<script>
export default {
  data: () => {
    return {

    }
  },
  methods: {
    navigateTo(route){
      this.$router.push(route);
    },

    logout(employer, jobseeker) {
      if (employer) {
        this.$store.dispatch('setEmployerLogOutAction');
        this.$router.push('/')
      }
      if (jobseeker) {
        this.$store.dispatch('setJobseekerLogOutAction');
        this.$router.push('/')
      }
    }
  }
}
</script>
