<template>
    <div class="container">
   <v-data-table
        :headers="tblHeaders"
        :items="tblItems"
    >
    <template v-slot:items="props">
      <td><img src="http://placehold.it/80x80"></td>
      <td>{{ props.item.title }}</td>
      <td  class="text-xs-left">{{ props.item.description}}</td>
      <td  class="text-xs-left"><v-btn color="success" small>Apply</v-btn></td>

    </template>
  </v-data-table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created: ()=>{
       
    },
    mounted: ()=>{
        this.getJobs();
    },
    data: ()=>{
        return {
            tblHeaders: [
                 {text:'',   value:'Logo',  sortable: false},
                 {text:'Title',   value:'Title' ,  sortable: false},
                 {text:'Description',  value:'Description' ,  sortable: false}
            ],
            tblItems: [
                {title:'cashier', description: 'descript'},
                {title:'clerk', description: 'descript'},
            ],

            jobs: []
        
        }
    },

    methods: {
        getJobs: function(){
            let url = '';
             axios.get(url)
                .then(res =>{
                //console.log(JSON.stringify(res.data.results))
                this.jobs= res.data.results;
                })
                .catch(function (error) {
                console.log(error)
             })
        }
    }
}
</script>