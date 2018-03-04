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
  export default {
    name: 'app',
    components: { AppNav, AppFooter },
    data () {
      return {
        auth: store.getters.isLoggedIn
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>