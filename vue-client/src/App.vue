<template>
  <div id="app">
    <v-app>
      <v-content>
        <app-header></app-header>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    'app-header': Header
  },
  data: () => {
    return {

    }
  }

}
</script>

<style>
</style>
