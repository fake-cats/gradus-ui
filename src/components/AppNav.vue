<template>
  <header>
    <div class="col-sm-2">
      
    </div>
    <div class="col-sm-8">
      <span><router-link to="/" exact>AppNav</router-link></span>
    </div>
    <div class="col-sm-2">
      <ul>
      <li>
        <router-link v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
      </li>
      <li>
        <router-link to="/" exact>Home</router-link>
        (authenticated)
      </li>
    </ul>
    </div>
  </header>
</template>

<script>
  import auth from '../auth'

  export default {
    data () {
      return {
        loggedIn: auth.loggedIn()
      }
    },
    created () {
      auth.onChange = loggedIn => {
        this.loggedIn = loggedIn
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