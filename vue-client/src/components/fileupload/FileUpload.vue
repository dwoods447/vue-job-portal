<template>
  <div>
      <v-card>
        <v-toolbar>
           {{  upload_header }}
        </v-toolbar>
        <v-img
          src="https://placehold.it/300x300"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-actions>
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label>{{ upload_label }}</label>
            <input type="file" ref="file"  @change="onSelect">
          <v-btn flat color="orange" @click="onSubmit">Update</v-btn>
          </form>
        </v-card-actions>
         <v-card-actions>
            <div>
              <h5>{{message}}</h5>
            </div>
        </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/ProfileSerivce'
export default {
  props:['upload_header', 'file_type', 'upload_label', 'upload_name'],
  data(){
    return {
      message: '',
      selectedFile: null,
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
    async onSubmit(){
        if (this.upload_name === 'company_logo') {
            console.log(`Submitting....Company Logo`)
            const fileUploadSuccesFull = (await ProfileService.uploadCompanyLogo(this.$store.state.route.params.employerId, this.selectedFile))
            if (fileUploadSuccesFull) {
                console.log('File Uploaded Succefully!');
                console.log(`Logo Response: ${JSON.stringify(fileUploadSuccesFull)}`)
            }
        }
        if (this.upload_name === 'company_photo') {
           console.log(`Submitting....Company Photo`)
          const fileUploadSuccesFull = (await ProfileService.uploadCompanyPhoto(this.$store.state.route.params.employerId, this.file))
           if (fileUploadSuccesFull) {
                console.log('File Uploaded Succefully!');
            }
        }
        if (this.upload_name === 'jobseeker_resume') {
           console.log(`Submitting....Jobseeker Resume`)
              const fileUploadSuccesFull = (await ProfileService.uploadCompanyPhoto(this.$store.state.route.params.jobseekerId, this.file))
               if (fileUploadSuccesFull) {
                console.log('File Uploaded Succefully!');
            }
        }
        if (this.upload_name === 'jobseeker_coverletter') {
          console.log(`Submitting....Jobseeker Cover Photo`)
              const fileUploadSuccesFull = (await ProfileService.uploadCoverLetter(this.$store.state.route.params.jobseekerId, this.file))
               if (fileUploadSuccesFull) {
                console.log('File Uploaded Succefully!');
            }
        }
    }
  }
}
</script>
