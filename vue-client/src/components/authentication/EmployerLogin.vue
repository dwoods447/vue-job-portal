<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Employer Login</v-toolbar-title>
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
                <div v-if="this.$store.state.successMessage"><strong><span style="color: green;">{{ this.$store.state.successMessage}}</span></strong></div>
                <div style="padding: 1em;" v-if="invalidPassword"><strong><span style="color: red;">Incorrect Username and/or Password</span></strong></div>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
      email:'',
      password:'',
      invalidPassword: false,
      emptyCredentials: false,
    }
  },
  methods: {
    async login(){
    if (this.email && this.password) {
    const response = await AuthenticationSerivce.employerLogin({
            email: this.email,
            password: this.password
          })
          if (response.status === 200) {
                this.$store.dispatch('setEmployerTokenAction', response.data.token);
                this.$store.dispatch('setEmployerAction', response.data.employer);
                this.$store.dispatch('setSuccessMessageAction', null)
                console.log(response);
                confirm('You are logged in !!!!!');
                this.$router.push({name: 'view.employer.profile', params: {employerId: this.$store.state.employer.id}})
          }
           if (response.status === 403) {
              console.log(response);
              this.$store.dispatch('setSuccessMessageAction', null)
                this.invalidPassword = true;
                 this.email = '';
                 this.password = '';
          }
      } else {
         this.$store.dispatch('setSuccessMessageAction', null)
          this.invalidPassword = true;
          this.email = '';
          this.password = '';
      }
    },

    clearInvalid(){
        this.invalidPassword = false;
        this.$store.dispatch('setSuccessMessageAction', null)
    },
    resetForm(){
      this.email = '';
      this.password = '';
    }
  },
  computed: {

  }
}
</script>
<style>

</style>
