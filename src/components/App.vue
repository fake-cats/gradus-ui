<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppNav from './AppNav.vue'
  import AppFooter from './AppFooter.vue'
  import store from '../store'
  import axios from 'axios'
  
  export default {
    name: 'app',
    store,
    components: { AppNav, AppFooter },
    data () {
      return {
        auth: store.getters.isLoggedIn,
        username: store.state.username
      }
    },
    methods: {
      logout() {
        store.logout()
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Karma', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>