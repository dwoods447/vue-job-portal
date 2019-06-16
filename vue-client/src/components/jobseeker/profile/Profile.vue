<template>
  <v-container>
     <v-layout row wrap>
    <v-flex xs3 class="section-container">
        <file-upload
         upload_header="Update Your Profile Photo"
         file_type="image"
         upload_label="Choose Photo"
         upload_name="profilephoto"
         profileType="jobseeker"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
      <file-upload
         upload_header="Update Your Resume"
         file_type="document"
         upload_label="Choose File"
         upload_name="resume"
         profileType="jobseeker"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
       <file-upload
         upload_header="Update Your Cover Letter"
         file_type="document"
         upload_label="Choose File"
         upload_name="coverletter"
         profileType="jobseeker"
         :profileID="this.$store.state.route.params.jobseekerId"
         >
      </file-upload>
      <br/>
    </v-flex>


    <v-flex xs-7 class="section-container">
      <v-card class="form-container">
        <v-toolbar>
         <h2>Update Your Profile Information</h2>
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
                 label="Short Bio"
                 v-model="joBSeeker.bio"
                 value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
               ></v-textarea>
             </v-flex>
             <v-flex 12>
                <v-btn flat color="orange" @click="updateProfile" ref="updateJobSeeker">Update</v-btn>
             </v-flex>

              <v-flex xs12>
                 <span v-if="alertSubmit"><strong style="color: red;">Please submit your information</strong></span>
              </v-flex>
          </form>
        </v-list>
      </v-card>
    </v-flex>


    <v-flex xs-3 class="section-container" style="max-width: 650px;">
          <v-card>
            <v-toolbar>
              <h2><span v-if="this.$store.state.jobseeker">{{this.$store.state.jobseeker.name}}'s Profile information</span></h2>
          </v-toolbar>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Address: <span v-if="this.$store.state.currentJobSeeker">{{this.$store.state.currentJobSeeker.address}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: <span v-if="this.$store.state.currentJobSeeker">{{this.$store.state.currentJobSeeker.phone}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>




            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Gender: <span v-if="this.$store.state.currentJobSeeker">{{ this.$store.state.currentJobSeeker.gender }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Birthdate: <span v-if="this.$store.state.currentJobSeeker">{{ this.$store.state.currentJobSeeker.dob }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>



            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Resume: <a href="javascript:void(0)" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.resume }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Cover Letter: <a href="javascript:void(0)" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.coverletter }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


             <div style="padding: 0.3em;">
               <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Bio:</v-list-tile-title>
                     </v-list-tile-content>
                </v-list-tile>
                    <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;"> {{this.$store.state.currentJobSeeker.bio}}</p>
             </div>
          </v-card>
          <br/>
          <v-card>
          <v-toolbar>
            <h2>Profile Completion Status</h2>
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
            <h3>Steps to Complete:</h3>
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
        <br/>
        <br/>
        <v-flex xs12 class="section-container">
          <v-card>
              <v-toolbar>
                <h2>Jobs You've Applied To</h2>
              </v-toolbar>
                  <v-data-table
                    :headers="tableHeaders"
                    :items="jobApplications"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                         <td>{{ props.item.location }}</td>
                         <td>{{ props.item.date_posted | formateDate}}</td>
                          <td>{{ props.item.date_applied | formateDate }}</td>
                    </template>
                  </v-data-table>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ProfileService from '../../../services/ProfileService.js'
import FileUpload from '../../fileupload/FileUpload'
import EventBus from '../../../main'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  components: {
    'file-upload': FileUpload
  },
  created(){
    this.getProfileInfo();
    this.checkJobsAppliedTo();
  },
  mounted(){
   let $this = this;
    EventBus.$on('update-jobseeker-progress', function(){
      console.log(`Updating the progress for the JobseekerProfile`);
      $this.getProfileInfo();
    })
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
      joBSeeker: {},
      jobApplications: [],
        tableHeaders: [
        {text: 'Position/Type', value:'Position/Type'},
        {text: 'Location', value: 'Location'},
        {text: 'Date Posted', value:'Date Posted'},
         {text: 'Date Applied', value:'Date Applied'},
      ],
       pagination: {
        pages: 1
      },
    }
  },
  filters: {
    capitalize(word){
       return word.charAt(0).toUpperCase() + word.slice(1);
    },
     formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  },
  methods: {
    inputChange: function(input){
      if (input && !this.alertSubmit) {
        this.alertSubmit = true;
      }
    },
    async updateProfile(){
        let obj = {};

        if (this.$store.state.jobseeker) obj.id = this.$store.state.route.params.jobseekerId
        if (this.joBSeeker.address)obj.address = this.joBSeeker.address
        if (this.joBSeeker.phone) obj.phone = this.joBSeeker.phone
        if (this.joBSeeker.gender) obj.gender = this.joBSeeker.gender
        if (this.joBSeeker.bio) obj.bio = this.joBSeeker.bio
         if (this.joBSeeker.dob) obj.dob = this.joBSeeker.dob
        if (this.joBSeeker.photo) obj.photo = this.joBSeeker.photo
        if (this.joBSeeker.resume) obj.resume = this.joBSeeker.resume
        if (this.joBSeeker.coverletter) obj.coverletter = this.joBSeeker.coverletter
         console.log(`Sending data: ${JSON.stringify(obj)}`)
         const updated = await ProfileService.updateJobSeekerProfile(obj);
         if (updated) {
            console.log('Info has been updated.... Retriveing It')
            console.log(JSON.stringify(updated));
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
       let seeker = (await ProfileService.getJobseekerProfile(seekerId)).data.jobseeker;
       if (seeker === null) {
         this.joBSeeker = {};
       } else {
        this.joBSeeker = seeker;
       }
       console.log(JSON.stringify(seeker))

       console.log(`Setting Current Jobseeker in store state : ${JSON.stringify(this.joBSeeker)}`)
       this.$store.dispatch('setCurrentJobseekerAction', this.joBSeeker)
       console.log(`Current Job Seeker in STATE: ${JSON.stringify(this.$store.state.currentJobSeeker)}`)
       // console.log(`Pulling Down profile ${JSON.stringify(this.joBSeeker)}`)
       this.updateProgressStatus(this.joBSeeker);
    },
    updateProgressStatus(joBSeeker){
       console.log(`Getting progress status`);
      console.log(JSON.stringify(joBSeeker))
     this.stepsToComplete = [];
     this.progressStatus = 1;
     if (joBSeeker) {
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
     } else {
         this.stepsToComplete = [];
         this.stepsToComplete.push('Enter your Address');
         this.stepsToComplete.push('Enter your Phone Number');
         this.stepsToComplete.push('Enter your Gender');
         this.stepsToComplete.push('Enter your Birthdate');
         this.stepsToComplete.push('Enter your Bio');
         this.stepsToComplete.push('Upload your Photo');
         this.stepsToComplete.push('Upload your Resume');
         this.stepsToComplete.push('Upload your Cover Letter');
     }
    },

    async checkJobsAppliedTo(){
      if (this.$store.state.route.params) {
        let jobseekerId = this.$store.state.route.params.jobseekerId;
        if (jobseekerId) {
           const applications = (await ProfileService.checkJobsAppliedTo(jobseekerId)).data.data;
           console.log(`Job Apps: ${JSON.stringify(applications)}`)
           if (applications) {
             this.jobApplications = applications;
           }
            console.log(`Job seeker ID: ${JSON.stringify(jobseekerId)}`)
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
