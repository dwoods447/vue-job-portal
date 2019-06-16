<template>
  <div>
      <v-card>
        <v-toolbar>
           {{  upload_header }}
        </v-toolbar>
        <div v-if="urlLoaded && url !== null && file_type !== 'document'">
          <v-img
            :src="url"
            aspect-ratio="1"
          ></v-img>
        </div>
        <div v-if="noURL && file_type !== 'document'">
        <v-img
          src="https://placehold.it/300x300"
          aspect-ratio="2.75"
        ></v-img>
        </div>
        <v-card-actions>
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label>{{ upload_label }}</label>
            <input type="file" ref="file"  @change="onSelect">
          <v-btn flat color="orange" @click="onSubmit">Update</v-btn>
          </form>
        </v-card-actions>
         <v-card-actions>
            <div v-if="uploadError">
              <h5 style="color:red;">{{message}}</h5>
            </div>
             <div v-if="uploadSuccess">
              <h5 style="color:green;">{{message}}</h5>
            </div>
        </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/ProfileService'
import EventBus from '../../main'
export default {
  props:['upload_header', 'file_type', 'upload_label', 'upload_name', 'profileID', 'profileType'],
  created(){
    this.getImageUrl(this.upload_name);
  },
  data(){
    return {
      message: '',
      selectedFile: null,
      uploadError: false,
      uploadSuccess: false,
      url: '',
      noURL: true,
      urlLoaded: false,
    }
  },
  methods: {
    onSelect: function(e){
        console.log(e);
        this.selectedFile = e.target.files[0]
        if (this.selectedFile) {
              console.log('File is selected');
        }
    },
    async getImageUrl(uploadName){
      console.log('Getting Image....')
      if (this.profileID && this.profileType === 'employer') {
         let employer = (await ProfileService.getEmployerProfile(this.profileID)).data.data
           console.log(`Employer: ${JSON.stringify(employer)}`)
          if (employer){
             if (uploadName === 'company_logo') {
               if (employer.logo !== null) {
                this.url = employer.logo;
                this.noURL = false;
                this.urlLoaded = true;
               }
            }
            if (uploadName === 'company_photo') {
              if (employer.coverphoto !== null) {
               this.url = employer.coverphoto;
               this.noURL = false;
               this.urlLoaded = true;
              }
           }
          }
      }
      if (this.profileID && this.profileType === 'jobseeker') {
       let seeker = (await ProfileService.getJobseekerProfile(this.profileID)).data.jobseeker;
       console.log(`Seeker: ${JSON.stringify(seeker)}`)
       if (seeker) {
         if (uploadName === 'profilephoto') {
           if (seeker.photo !== null){
                this.url = seeker.photo;
                this.noURL = false;
                this.urlLoaded = true;
           }
         }
         if (uploadName === 'coverletter') {
           if (seeker.coverletter !== null){
            console.log('Need to update profile with coverletter url')
            // this.url = seeker.resume;
            this.url = seeker.coverletter;
            this.noURL = false;
            this.urlLoaded = false;
           }
         }
         if (uploadName === 'resume') {
           if (seeker.resume !== null){
              console.log('Need to update profile with resume url')
             // this.url = seeker.resume;
             this.noURL = false;
             this.urlLoaded = false;
           }
         }
       }
      }
    },
    async onSubmit(){
      // Check thew upload name
        if (this.upload_name === 'company_logo') {
            console.log(`Submitting....Company Logo`)
            try {
              // Upload File
              const fileUploadSuccesFull = (await ProfileService.uploadCompanyLogo(this.$store.state.route.params.employerId, this.selectedFile)).data
              console.log(`${JSON.stringify(fileUploadSuccesFull)}`)
              if (fileUploadSuccesFull.error) {
                this.uploadError = true;
                 this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
              } else {
                 console.log('Successful file upload')
                 // If file success change image url
                  this.getImageUrl(this.upload_name);
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                  // Emit event to EmployerProfile to update progress status
                  EventBus.$emit('update-employer-progress');
              }
            } catch (error) {
              console.log(`There was an error uploading the file.: ${error}`);
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
            }
        }
        if (this.upload_name === 'company_photo') {
           console.log(`Submitting....Company Photo`)
           try {
          const fileUploadSuccesFull = (await ProfileService.uploadCompanyPhoto(this.$store.state.route.params.employerId, this.selectedFile)).data
            console.log(`${JSON.stringify(fileUploadSuccesFull)}`)
           if (fileUploadSuccesFull.error) {
                  this.uploadError = true;
                 this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
           } else {
                console.log('File Uploaded Succefully!');
                 this.getImageUrl(this.upload_name);
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                  EventBus.$emit('update-employer-progress');
           }
           } catch (error){
              console.log(`There was an error uploading the file.: ${error}`);
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
           }
        }
        if (this.upload_name === 'profilephoto'){
          try {
            const fileUploadSuccesFull = (await ProfileService.uploadJobseekerPhoto(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
            console.log(`${JSON.stringify(fileUploadSuccesFull)}`)
             if (fileUploadSuccesFull.error) {
                  this.uploadError = true;
                 this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
           } else {
                 console.log('File Uploaded Succefully!');
                 this.getImageUrl(this.upload_name);
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                  EventBus.$emit('update-jobseeker-progress');
           }
          } catch (error){
              console.log(`There was an error uploading the file.: ${error}`);
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
        if (this.upload_name === 'resume') {
          try {
            console.log(`Submitting....Jobseeker Resume`)
              const fileUploadSuccesFull = (await ProfileService.uploadResume(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
               console.log(`${JSON.stringify(fileUploadSuccesFull)}`)
             if (fileUploadSuccesFull.error) {
               console.log('Error occured!')
                this.uploadError = true;
                this.uploadSuccess = false;
                this.message = 'There was an error uploading the file.'
             } else {
                console.log('File Uploaded Succefully!');
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                 EventBus.$emit('update-jobseeker-progress');
             }
          } catch (error){
              console.log(`There was an error uploading the file.: ${error}`);
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
        if (this.upload_name === 'coverletter') {
           try {
              console.log(`Submitting....Jobseeker Cover Letter`)
              const fileUploadSuccesFull = (await ProfileService.uploadCoverLetter(this.$store.state.route.params.jobseekerId, this.selectedFile)).data
              console.log(`${JSON.stringify(fileUploadSuccesFull)}`)
              if (fileUploadSuccesFull.error) {
              console.log('Error occured!')
              } else {
                console.log('File Uploaded Succefully!');
                  this.uploadError = false;
                  this.uploadSuccess = true;
                  this.selectedFile = null;
                  this.message = 'Successful file upload';
                 EventBus.$emit('update-jobseeker-progress');
              }
          } catch (error){
              console.log(`There was an error uploading the file.: ${error}`);
              this.uploadError = true;
              this.uploadSuccess = false;
              this.message = 'There was an error uploading the file.'
          }
        }
    },
  }
}
</script>
