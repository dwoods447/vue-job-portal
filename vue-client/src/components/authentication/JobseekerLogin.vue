<template>
<v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Jobseeker Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <!-- <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon large>code</v-icon>
                    </v-btn> -->
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank" v-on="on">
                      <v-icon large>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" @keyup.enter="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import AuthenticationSerivce from '../../services/AuthtenicationService'
export default {
  created () {

  },
  mounted () {

  },
  props: {
      source: String
  },
  data: function () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
  async login(){
      const response = await AuthenticationSerivce.jobseekerLogin({
        email: this.email,
        password: this.password
      })

      if (response.status === 200){
          console.log(response);
            this.$store.dispatch('setJobseekerTokenAction', response.data.token)
            this.$store.dispatch('setJobseekerAction', response.data.jobseeker)
         confirm('You are logged in !!!!!');
         this.$router.push({name: 'view.jobseeker.profile', params: {jobseekerId: this.$store.state.jobseeker.id}})
       }
    }
  },
  computed: {

  }
}
</script>
<style>

</style>
