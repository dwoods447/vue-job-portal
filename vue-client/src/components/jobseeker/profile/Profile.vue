<template>
  <v-container>
     <v-layout>
    <v-flex xs3 class="section-container">
      <v-card>
        <v-toolbar>
          Update Your Profile Photo
        </v-toolbar>
        <v-img
          src="https://placehold.it/900x900"
          aspect-ratio="3.57"
        ></v-img>

        <v-card-actions>
          <form action="">
            <input type="file" @change="photoUpload">
          <v-btn flat color="orange">Update</v-btn>
          </form>
        </v-card-actions>
      </v-card>
      <br/>
       <v-card>
        <v-toolbar>
          Update Your Resume
        </v-toolbar>
        <v-card-actions>
          <form action="">
            <input type="file" @change="resumeUpload">
          <v-btn flat color="orange">Update</v-btn>
          </form>
        </v-card-actions>
      </v-card>
      <br/>
       <v-card>
        <v-toolbar>
          Update Your Cover Letter
        </v-toolbar>
        <v-card-actions>
          <form action="">
            <input type="file" @change="coverLetterUpload">
          <v-btn flat color="orange">Update</v-btn>
          </form>
        </v-card-actions>
      </v-card>
      <br/>
    </v-flex>


    <v-flex xs-7 class="section-container">
      <v-card class="form-container">
        <v-toolbar>
         Update Your Profile Information
        </v-toolbar>
        <v-list two-line>

          <form action="" class="form">
            <v-flex xs12 d-flex>
                <v-text-field label="Address" outline v-model="joBSeeker.address" @change="inputChange(joBSeeker.address)"></v-text-field>
            </v-flex>

            <v-flex xs12 d-flex>
               <v-text-field label="Phone" outline v-model="joBSeeker.phone" @change="inputChange(joBSeeker.phone)"></v-text-field>

            </v-flex>



            <v-flex xs12  d-flex>
                <v-select
                :items="genders"
                outline
                label="Gender"
                v-model="joBSeeker.gender"
                @change="inputChange(joBSeeker.gender)"
                solo
                >
                </v-select>

            </v-flex>
             <v-flex xs12 d-flex>
               <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="joBSeeker.dob"
                  @change="inputChange(joBSeeker.dob)"
                  label="Birthday date"
                  readonly
                  outline
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="joBSeeker.dob"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
              </v-menu>
            </v-flex>
             <v-flex xs12  d-flex>
               <v-textarea
                 outline
                 textarea
                 label="Bio"
                 v-model="joBSeeker.bio"
                 value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
               ></v-textarea>
             </v-flex>
             <span v-if="alertSubmit"><strong style="color: red;">Please submit your information</strong></span>
            <v-btn flat color="orange" @click="updateProfile" ref="submit">Update</v-btn>
          </form>
        </v-list>
      </v-card>
    </v-flex>


    <v-flex xs-3 class="section-container">
          <v-card>
            <v-toolbar>
             <span v-if="$store.state.jobseeker">{{$store.state.jobseeker.name}}'s Profile information</span>
          </v-toolbar>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Address: <span v-if="joBSeeker">{{joBSeeker.address}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: <span v-if="joBSeeker">{{joBSeeker.phone}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>




            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Gender: <span v-if="joBSeeker">{{ joBSeeker.gender }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Birthdate: <span v-if="joBSeeker">{{ joBSeeker.dob }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>



            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Resume: <a href="javascript:void(0)" v-if="joBSeeker"><span>{{ joBSeeker.resume }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Cover Letter: <a href="javascript:void(0)" v-if="joBSeeker"><span>{{ joBSeeker.coverletter }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

          </v-card>
          <br/>
          <v-card>
          <v-toolbar>
           Profile Completion Status
          </v-toolbar>
            <v-layout row wrap>
            <v-flex xs3 >
              <div style="padding: 1em;">
              <v-progress-circular
                :rotate="-90"
                :size="100"
                :width="15"
                :value="progressStatus"
                color="primary"
              >
                {{ progressStatus.toFixed(0) }}%
              </v-progress-circular>
              </div>
            </v-flex>

          <v-flex xs9 justify-center>
            <h2>Steps to Complete:</h2>
            <div v-for="step in stepsToComplete" :key="step">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ step }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            </div>

            </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProfileService from '../../../services/ProfileSerivce.js'
export default {
  created(){
    this.getProfileInfo();
  },
  mounted(){
  },
  data: function(){
    return {
      alertSubmit: false,
      date: null,
      menu: false,
      genders: [
        'male',
        'female'
      ],
      progressStatus: 1,
      value: '50%',
      stepsToComplete: [],
      joBSeeker: {
        address: '',
        phone: '',
        gender:'',
        bio: '',
        photo: '',
        resume:'',
        coverletter: '',
        dob: '',

      },
    }
  },
  filters: {
    capitalize(word){
       return word.charAt(0).toUpperCase() + word.slice(1);
    }
  },
  methods: {
    inputChange: function(input){
      if (input) {
        this.alertSubmit = true;
        this.$refs.submit.focus();
      }
    },
    async updateProfile(){
        let obj = {};
        console.log(`Sending data: ${this.$store.state.jobseeker}`)
        if (this.$store.state.jobseeker) obj.id = this.$store.state.route.params.jobseekerId
        if (this.joBSeeker.address)obj.address = this.joBSeeker.address
        if (this.joBSeeker.phone) obj.phone = this.joBSeeker.phone
        if (this.joBSeeker.gender) obj.gender = this.joBSeeker.gender
        if (this.joBSeeker.bio) obj.bio = this.joBSeeker.bio
         if (this.joBSeeker.dob) obj.dob = this.joBSeeker.dob
        if (this.joBSeeker.photo) obj.photo = this.joBSeeker.photo
        if (this.joBSeeker.resume) obj.resume = this.joBSeeker.resume
        if (this.joBSeeker.coverletter) obj.coverletter = this.joBSeeker.coverletter
         const updated = await ProfileService.updateJobSeekerProfile(obj);
         if (updated) {
            this.alertSubmit = false;
            this.getProfileInfo();
         }
         // window.location.reload(true);
    },

    photoUpload: (e) => {
      this.joBSeeker.photo = e.target.files || e.dataTransfer.files;
    },
    resumeUpload: (e) => {
      this.joBSeeker.resume = e.target.files || e.dataTransfer.files;
    },
    coverLetterUpload: (e) => {
      this.joBSeeker.coverletter = e.target.files || e.dataTransfer.files;
    },
    save (date) {
        this.$refs.menu.save(date)
        this.inputChange(this.joBSeeker.dob);
    },
    async getProfileInfo() {
       this.joBSeeker = {};
       const seekerId = this.$store.state.route.params.jobseekerId;
       console.log(`Route params: ${seekerId}`);
       let seeker = await ProfileService.getJobseekerProfile(seekerId);
       console.log(JSON.stringify(seeker))
       this.joBSeeker = seeker.data.jobseeker;
       console.log(`Setting Current Jobseeker in store state : ${JSON.stringify(this.joBSeeker)}`)
       this.$store.dispatch('setCurrentJobseekerAction', this.joBSeeker)
       // console.log(`Pulling Down profile ${JSON.stringify(this.joBSeeker)}`)
       this.updateProgressStatus(this.joBSeeker);
    },
    updateProgressStatus(joBSeeker){
      // console.log(`Getting progress status`);
     // console.log(JSON.stringify(joBSeeker))
     this.stepsToComplete = [];
     this.progressStatus = 1;
      let requireValues = joBSeeker;
      for (var key in requireValues) {
         // console.log(`Key ${key} value: ${requireValues[key]}`);
           if (key !== 'jobseekerId' || key !== 'createdAt' || key !== 'updatedAt'){
              if (requireValues[key] !== null) {
                this.progressStatus = this.progressStatus + 8.29;
                if (this.progressStatus > 100) {
                  this.this.progressStatus = 100;
                }
              } else {
                    if (key === 'address') {
                        this.stepsToComplete.push('Enter your Address');
                    }
                    if (key === 'phone') {
                         this.stepsToComplete.push('Enter your Phone Number');
                     }
                    if (key === 'gender') {
                        this.stepsToComplete.push('Enter your Gender');
                     }
                    if (key === 'dob') {
                        this.stepsToComplete.push('Enter your Birthdate');
                     }
                    if (key === 'bio') {
                        this.stepsToComplete.push('Enter your Bio');
                     }
                    if (key === 'photo') {
                        this.stepsToComplete.push('Upload your Photo');
                    }
                    if (key === 'resume') {
                        this.stepsToComplete.push('Upload your Resume');
                     }
                    if (key === 'coverletter') {
                        this.stepsToComplete.push('Upload your Cover Letter');
                    }
              }
         }
      }
    }
  },
   watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
  },
}
</script>
<style>
.form{
  padding: 1em;
}
  .section-container{
    padding: 0.2em;
  }
  .content-item{
    padding: 1em;
    border-bottom: 1px solid #eee;
  }
</style>
