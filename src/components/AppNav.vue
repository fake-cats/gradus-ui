<template>
  <header>
    <div class="col-sm-2">
      
    </div>
    <div class="col-sm-8">
      <span><router-link to="/" exact>AppNav</router-link></span>
    </div>
    <div class="col-sm-2">
      <ul>
      <router-link v-if="isLoggedIn === false" to="/login">
        <button class="btn-small">Log in</button>
      </router-link>
      <li v-else>
        <button class="btn-small" v-on:click="logout()">Log out</button>
      </li>
      <li>
        <router-link to="/" exact>Home</router-link>
      </li>
    </ul>
    </div>
  </header>
</template>

<script>
  import auth from '../auth'
  import store from '../store'

  export default {
    data () {
      return {
        posts: [],
        loading: false
      }
    },
    computed: {
      isLoggedIn () {
        return store.getters.isLoggedIn
      }
    },
    methods: {
      logout() {
        console.log("LOGOUT")
        store.dispatch("logout");
        this.loggedIn = false
      }
    }
  }
</script>

<style>
  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
</style>