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
            <input type="file">
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
            <input type="file">
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
            <input type="file">
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
                <v-text-field label="Address" outline></v-text-field>
            </v-flex>

            <v-flex xs12 d-flex>
               <v-text-field label="Phone" outline></v-text-field>
            </v-flex>

            <v-flex xs12  d-flex>
                <v-select
                :items="genders"
                outline
                label="Gender"
                solo
                >
                </v-select>
            </v-flex>
             <v-flex xs12  d-flex>
               <v-textarea
                 outline
                 textarea
                 label="Bio"
                 value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
               ></v-textarea>
             </v-flex>
            <v-btn flat color="orange">Update</v-btn>
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
                <v-list-tile-title>Address: </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>


            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Phone: </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>



            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Gender: </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>




            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Resume: </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Cover Letter: </v-list-tile-title>
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
export default {
  data: function(){
    return {
      genders: [
        'male',
        'female'
      ],
      value: '50%',
    }
  }
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
