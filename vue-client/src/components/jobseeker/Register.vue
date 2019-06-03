<template>
      <v-container>
        <v-layout row wrap>
                <v-flex x12 justify-center>
                    <h2>Jobseeker Registration</h2>
                    <v-card-actions class="justify-center">
                    <form style="width: 50%;">

                      <v-text-field
                        v-model="jobSeekerRegistration.name"
                        name="name"
                        v-validate="'required|max:35'"
                        :counter="35"
                        :error-messages="errors.collect('name')"
                        label="Name"
                        data-vv-name="name"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="jobSeekerRegistration.email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        name="email"
                        required
                      ></v-text-field>




                          <v-text-field
                            name="password"
                            label="Password"
                            v-model="jobSeekerRegistration.password"
                           v-validate="'required'"
                            data-vv-name="password"
                          ></v-text-field>

                          <v-text-field
                            name="confirm"
                            v-model="jobSeekerRegistration.confirmPassword"
                            label="Confirm Password"
                            v-validate="'required'"
                            data-vv-name="confirm"
                          ></v-text-field>

                      <v-btn @click="submit">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                    </form>
                    </v-card-actions>
                </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import Auth from '../../services/JobSeekerRegistration'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter a value'
            },
            name: {
              required: 'Please enter a value'
            },
            password:{
                required: 'Please enter a value'
            },
            confirm: {
              required: 'Please enter a value'
            }

        }
};

Validator.localize('en', dict);


export default {
  inject: ['$validator'],
    created(){

    },
    mounted(){

    },
    data: function() {
        return {

          jobSeekerRegistration:{
            name: '',
            email:'',
            password:'',
            confirmPassword:''
          }

        }
    },
    methods: {
        async submit() {
          if (this.jobSeekerRegistration.password && this.jobSeekerRegistration.confirmPassword){
              if (this.jobSeekerRegistration.password === this.jobSeekerRegistration.confirmPassword){
                const res = await Auth.register({
                  name: this.jobSeekerRegistration.name,
                  email: this.jobSeekerRegistration.email,
                  password: this.jobSeekerRegistration.password
                })
                if (res.status === 200){
                  this.$router.push('/jobseeker/login');
                }
              } else {
                confirm('Passwords Do not Match!')
              }
          }
        },
        clear: function(){},
    },
    computed: {

    }
}
</script>
<style>

</style>
