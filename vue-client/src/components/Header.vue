<template>
  <div>
  <v-toolbar color="primary">
      <v-toolbar-title><v-btn  @click="navigateTo('home')" flat dark>Online Job Portal</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      <v-menu offset-y v-if="!$store.state.isJobseekerLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            flat
          >
            <span v-if="!$store.state.isEmployerLoggedIn" style="color: #fff;">Employer</span>
            <span  v-if="$store.state.isEmployerLoggedIn && $store.state.employer" style="color: #fff;">{{$store.state.employer.company}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-if="!$store.state.isEmployerLoggedIn && !$store.state.isJobseekerLoggedIn">
            <v-list-tile-title><a  href="javascript:void(0)" @click="navigateTo('employer.login')">Employer Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="!$store.state.isEmployerLoggedIn && !$store.state.isJobseekerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('employer.registration')">Employer Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile  v-if="$store.state.isEmployerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('view.employer.profile', {employerId: $store.state.employer.id})">Employer Profile</a></v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="$store.state.isEmployerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)"  @click="navigateTo('view.job.applicants', {employerId: $store.state.employer.id})">View Job Applicants</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile v-if="$store.state.isEmployerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)"  @click="navigateTo('employer.post.job', {employerId: $store.state.employer.id})">Post,Edit, or Remove a Job</a></v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-menu>
      <v-menu offset-y v-if="!$store.state.isEmployerLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            flat
          >
          <span v-if="!$store.state.isJobseekerLoggedIn" style="color: #fff;">Jobseeker</span>
          <span  v-if="$store.state.isJobseekerLoggedIn && $store.state.jobseeker" style="color: #fff;">{{$store.state.jobseeker.name}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-if="!$store.state.isJobseekerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('jobseeker.login')" >Jobseeker Login</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile v-if="!$store.state.isJobseekerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('jobseeker.registration')" >Jobseeker Registration</a></v-list-tile-title>
          </v-list-tile>
           <v-list-tile v-if="$store.state.isJobseekerLoggedIn">
            <v-list-tile-title><a href="javascript:void(0)" @click="navigateTo('view.jobseeker.profile', {jobseekerId: $store.state.jobseeker.id})" >Jobseeker Profile</a></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
        <v-btn
            dark
            flat
           v-if="$store.state.isEmployerLoggedIn || $store.state.isJobseekerLoggedIn" @click="logout($store.state.isEmployerLoggedIn, $store.state.isJobseekerLoggedIn)">
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
