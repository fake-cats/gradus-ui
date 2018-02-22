<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
<!--     <form @submit.prevent="login()">
      <input type="text" class="form-control" placeholder="email" v-model="email">
      <input type="password" class="form-control" placeholder="password" v-model="password">
      <button class="btn btn-primary" type="submit">Login</button>
    </form> -->
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
        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, '/');
        console.log(localStorage.getItem('uid'))
        console.log(localStorage.getItem('access-token'))
        console.log(localStorage.getItem('client'))
      },
      // login() {
      //   this.$store.dispatch("login", {
      //     email: this.email,
      //     password: this.password
      //   }).then(res => {
      //     this.$router.push('/');
      //   })
      // },
      logout() {
        // Remove the profile and token from localStorage
        localStorage.removeItem('profile')
        localStorage.removeItem('id_token')
      },
    }
  }
</script>