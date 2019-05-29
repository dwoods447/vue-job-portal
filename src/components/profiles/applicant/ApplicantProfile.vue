<template>
   <div class="container">
     <h2></h2>

       <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Fill Out Profile</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Upload Resume/Cover Letter</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Review Profile</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
         <v-form>
        <v-container>
        <v-layout wrap>
            <v-flex xs6>
               <v-text-field 
                  v-model="address" 
                  placeholder="Address"
                  outline
               >
               </v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field 
                 v-model="phone" 
                 placeholder="Phone" 
                 outline>
                 </v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-select
                :items="genders"
                label="Gender"
                outline
                ></v-select>
            </v-flex>
            <v-flex  xs12>
               <v-textarea
          outline
          name="input-7-4"
          label="Experience"
          value=""
        ></v-textarea>
            </v-flex>

              <v-flex  xs12>
               <v-textarea
          outline
          name="input-7-4"
          label="Bio"
          value=""
        ></v-textarea>
            </v-flex>
        </v-layout>
        </v-container>
    </v-form>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

 <v-stepper-content step="2">

     <v-text-field label="Select Resume" @click='pickFile' v-model='resume' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>

       <v-text-field label="Select Cover Letter" @click='pickFile' v-model='coverletter' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
   
   </div>
</template>
<script>
export default {

    data: () =>{
     return {
       e1: 0,
            title: "Image Upload",
        dialog: false,
		resume: '',
		coverletter: '',
		imageFile: '',
       address: '',
       phone:'',
       genders: ['male', 'female'],
       files: [],
     }
    },

    methods:{
       pickFile () {
            this.$refs.image.click ()
      },
      
   onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
  }
}
</script>
<style>

</style>

