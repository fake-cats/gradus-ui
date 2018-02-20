<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import auth from '../auth'
  import AppNav from './AppNav.vue'
  import AppFooter from './AppFooter.vue'
  export default {
    name: 'app',
    components: { AppNav, AppFooter },
    data () {
      return {
        user: auth.user
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>