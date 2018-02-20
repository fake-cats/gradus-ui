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

  export default {
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
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
      auth.login(this, credentials, 'home')
    },
    // login: function() {
    //   console.log(this.name);
    //   axios.post('https://gradusunum-mainframe-api.herokuapp.com/auth/sign_in/', 
    //   this.name,
    //     { headers: { 'Content-type': 'application/x-www-form-urlencoded',
    //     }}).then(r => console.log('r: ', JSON.stringify(r, null, 2)));
    // },
    logout() {
      // Remove the profile and token from localStorage
      localStorage.removeItem('profile')
      localStorage.removeItem('id_token')
    },
  }
  }
</script>