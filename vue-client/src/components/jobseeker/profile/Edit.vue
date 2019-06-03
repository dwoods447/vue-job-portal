<template>
  <v-container>
     <v-layout>
    <v-flex xs3 class="section-container">
      <v-card>
        <v-toolbar>
          Header
        </v-toolbar>
        <v-img
          src="https://placehold.it/300x300"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>  </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>


    <v-flex xs-7 class="section-container">
      <v-card>
        <v-toolbar>
          Header
        </v-toolbar>
      </v-card>
    </v-flex>


        <v-flex xs-3 class="section-container">
          <v-card>
            <v-toolbar>
            Header
          </v-toolbar>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: function(){
    return {

    }
  }
}
</script>
<style>
  .section-container{
    padding: 0.2em;
  }
</style>
