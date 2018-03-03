<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="login-box">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your email"
          v-model="credentials.email"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
        >
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submit()">Login</button>
    </div>
    <!-- <form @submit.prevent="login()">
     <input type="text" class="form-control" placeholder="email" v-model="credentials.email">
     <input type="password" class="form-control" placeholder="password" v-model="credentials.password">
     <button type="submit">Login</button>
    </form> -->
  </div>
</template>

<script>
  import auth from '../auth'
  import store from '../store'
  import axios from 'axios'

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {
      submit() {
        store.dispatch("login", {
          email: this.credentials.email,
          password: this.credentials.password
        });
        this.$router.push('/')
      }
    }
  }
</script>