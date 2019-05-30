<template>
    <div class="container">
 <form>
    <v-text-field
      v-model="name"
       label="Name"
    ></v-text-field>
    <v-text-field
      v-model="email"
       label="Email"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="genders"
      label="Gender"
      required
    ></v-select>
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
        v-model="date"
        label="Birthday date"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>

        <v-text-field
            v-model="password"
            :append-icon="passwordShow1 ? 'visibility' : 'visibility_off'"
            :type="passwordShow1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="passwordShow1 = !passwordShow1"
          ></v-text-field>
           <v-text-field
            v-model="password"
            :append-icon="passwordShow2 ? 'visibility' : 'visibility_off'"
            :type="passwordShow2 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="passwordShow2 = !passwordShow2"
          ></v-text-field>

    <v-btn @click="submit">Register</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
    </div>
</template>
<script>
export default {
    data: ()=>{
     return {
         name:'',
         email:'',
         select:'',
         genders: ['male', 'female'],
         checkbox: '',
          menu: false,
          date: null,
           passwordShow1: false,
           passwordShow2: false,
           password: '',
           confirmPassword: '',
     }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
        clear:()=>{

        },

        submit:()=>{

        },
        save (date) {
        this.$refs.menu.save(date)
        }
    
    }
}
</script>