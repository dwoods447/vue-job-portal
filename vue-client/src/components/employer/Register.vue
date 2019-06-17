<template>
      <v-container>
        <v-layout row wrap>
                <v-flex x12 justify-center>
                    <h2>Employer Registration</h2>
                    <v-card-actions class="justify-center">
                    <form style="width: 50%;" autocomplete="off">

                      <v-text-field
                        v-model="employerRegistration.companyName"
                        name="company"
                        v-validate="'required|max:35'"
                        :counter="35"
                        :error-messages="errors.collect('company')"
                        label="Company Name"
                        data-vv-name="company"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="employerRegistration.email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        label="E-mail"
                        data-vv-name="email"
                        name="email"
                        required
                      ></v-text-field>


                        <v-text-field
                          v-model="employerRegistration.representative"
                          v-validate="'required'"
                          label="Your Name"
                          :error-messages="errors.collect('representative')"
                          data-vv-name="representative"
                          name="representative"
                          required
                        ></v-text-field>


                          <v-text-field
                            name="password"
                            label="Password"
                            v-model="employerRegistration.password"
                           v-validate="'required'"
                            data-vv-name="password"
                            autocomplete="new-password"
                          ></v-text-field>

                          <v-text-field
                            name="confirm"
                            v-model="employerRegistration.confirmPassword"
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
import RegisterService from '../../services/RegistrationService'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter a value'
            },
            company: {
              required: 'Please enter a value'
            },
            representative: {
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
          employerRegistration:{
            companyName: '',
            representative: '',
            email:'',
            password:'',
            confirmPassword:'',

          }

        }
    },
    methods: {
        async submit() {
          if (this.employerRegistration.password && this.employerRegistration.confirmPassword){
              if (this.employerRegistration.password === this.employerRegistration.confirmPassword){
                const res = await RegisterService.employerRegister({
                  company: this.employerRegistration.companyName,
                  email: this.employerRegistration.email,
                  representative: this.employerRegistration.representative,
                  password: this.employerRegistration.password
                })
               console.log(`Message: ${JSON.stringify(res.data.message)}`);
                if (res.status === 200){
                      this.$store.dispatch('setSuccessMessageAction', res.data.message)
                      this.$router.push({name: 'employer.login'});
               }
               if (res.status === 403) {
                   confirm('You are unauthorized to peform this action');
               }
               if (res.status === 500) {
                  confirm('There was an error trying to perform this action');
               }
            }
          }
        },

        clear(){

        }

    },
    computed: {

    }
}
</script>
<style>

</style>
