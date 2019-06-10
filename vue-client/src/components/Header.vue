<template>
  <div>
  <v-toolbar>
      <v-toolbar-title><v-btn  @click="navigateTo('home')" flat>Online Job Portal</v-btn></v-toolbar-title>
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
            <span  v-if="$store.state.isEmployerLoggenIn && $store.state.employer">{{$store.state.employer.company}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-if="!$store.state.isEmployerLoggenIn && !$store.state.isJobseekerLoggenIn">
            <v-list-tile-title><a  href="javascript:void(0)" @click="navigateTo('employer.login')">Employer Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="!$store.state.isEmployerLoggenIn && !$store.state.isJobseekerLoggenIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('employer.registration')">Employer Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="$store.state.isEmployerLoggenIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('view.employer.profile', {employerId: $store.state.employer.id})">Employer Profile</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile v-if="$store.state.isEmployerLoggenIn">
            <v-list-tile-title><a href="javascript:void(0)"  @click="navigateTo('employer.post.job', {employerId: $store.state.employer.id})">Post a Job</a></v-list-tile-title>
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
          <span  v-if="$store.state.isJobseekerLoggenIn && $store.state.jobseeker">{{$store.state.jobseeker.name}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile >
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('jobseeker.login')" v-if="!$store.state.isJobseekerLoggenIn">Jobseeker Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile>
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('jobseeker.registration')" v-if="!$store.state.isJobseekerLoggenIn">Jobseeker Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile>
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('view.jobseeker.profile', {jobseekerId: $store.state.jobseeker.id})" v-if="$store.state.isJobseekerLoggenIn">Jobseeker Profile</a></v-list-tile-title>
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
    navigateTo(route, param){
      if (param) {
        console.log(`The params are defined: ${JSON.stringify(param)}`)
        this.$router.push({ name: route, params: param });
      } else {
         this.$router.push({name: route});
      }
    },

    logout(employer, jobseeker) {
      if (employer) {
        this.$store.dispatch('setEmployerLogOutAction');
        this.$router.push('/')
        localStorage.clear();
      }
      if (jobseeker) {
        this.$store.dispatch('setJobseekerLogOutAction');
        this.$router.push('/')
        localStorage.clear();
      }
    }
  }
}
</script>
