<template>
  <v-container>
     <v-layout>
    <v-flex xs3 class="section-container">
      <v-card>
        <v-toolbar>
          Update Your Profile Photo
        </v-toolbar>
        <v-img
          src="https://placehold.it/300x300"
          aspect-ratio="2.75"
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
          <span>Profile information</span>
        </v-toolbar>
        <v-list two-line>

          <form action="" class="form">
            <v-flex xs12 d-flex>
                <v-text-field label="Address" outline v-model="address"></v-text-field>
            </v-flex>

            <v-flex xs12 d-flex>
               <v-text-field label="Phone" outline v-model="phone"></v-text-field>

            </v-flex>



            <v-flex xs12  d-flex>
                <v-select
                :items="genders"
                outline
                label="Gender"
                v-model="gender"
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
                  v-model="dob"
                  label="Birthday date"
                  readonly
                  outline
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="dob"
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
                 v-model="bio"
                 value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
               ></v-textarea>
             </v-flex>
            <v-btn flat color="orange" @click="updateProfile">Update</v-btn>
          </form>
        </v-list>
      </v-card>
    </v-flex>


    <v-flex xs-3 class="section-container">
          <v-card>
            <v-toolbar>
            Your Profile Information
          </v-toolbar>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Address: <span v-if="joBSeeker.address">{{joBSeeker.address}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: <span v-if="joBSeeker.phone">{{joBSeeker.phone}}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>



            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Gender: <span v-if="joBSeeker.gender">{{ joBSeeker.gender }}</span></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>




            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Resume: <a href="javascript:void(0)" v-if="joBSeeker.resume"><span>{{ joBSeeker.resume }}</span></a></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Cover Letter: <a href="javascript:void(0)" v-if="joBSeeker.coverletter"><span>{{ joBSeeker.coverletter }}</span></a></v-list-tile-title>
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
                :value="value"
                color="primary"
              >
                {{ value }}
              </v-progress-circular>
              </div>
            </v-flex>

              <v-flex xs9 justify-center>
            <h2>Steps:</h2>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Upload Resume </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
           <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Upload Cover Letter </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
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
      date: null,
      menu: false,
      address: '',
      phone: '',
      gender:'',
      bio: '',
      photo: '',
      resume:'',
      coverletter: '',
      dob: '',
      genders: [
        'male',
        'female'
      ],
      value: '50%',
      joBSeeker: {},
    }
  },

  methods: {
    async updateProfile(){
        let obj = {};
        console.log(`Sending data: ${this.$store.state.jobseeker}`)
        if (this.$store.state.jobseeker) obj.id = this.$store.state.jobseeker.id
        if (this.address !== '')obj.address = this.address
        if (this.phone) obj.phone = this.phone
        if (this.gender) obj.gender = this.gender
        if (this.bio) obj.bio = this.bio
        if (this.photo) obj.photo = this.photo
        if (this.resume) obj.resume = this.resume
        if (this.coverletter) obj.coverletter = this.coverletter
         const update = await ProfileService.updateJobSeekerProfile(obj);
         if (update) {
            this.getProfileInfo();
         }
         // window.location.reload(true);
    },

    photoUpload: (e) => {
      this.photo = e.target.files || e.dataTransfer.files;
    },
    resumeUpload: (e) => {
      this.resume = e.target.files || e.dataTransfer.files;
    },
    coverLetterUpload: (e) => {
      this.coverletter = e.target.files || e.dataTransfer.files;
    },
    save (date) {
        this.$refs.menu.save(date)
    },
    async getProfileInfo() {
       this.joBSeeker = {};
      const seekerId = this.$store.state.route.params.jobseekerId;
       let seeker = await ProfileService.getJobseekerProfile({id: seekerId});
       this.joBSeeker = seeker.data.jobseeker;
       console.log(`Pulling Down profile ${JSON.stringify(this.joBSeeker)}`)
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
