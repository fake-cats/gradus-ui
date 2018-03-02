<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
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
    <button class="btn btn-primary" @click="submit()">Access</button>
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
        console.log("STEP 1")
        store.dispatch("login", {
          email: this.credentials.email,
          password: this.credentials.password
        }).then(res => {
          $router.push('/');
        })
      },
      logout() {
        // Remove the profile and token from localStorage
        localStorage.removeItem('profile')
        localStorage.removeItem('id_token')
      },
    }
  }
</script>