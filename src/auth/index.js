import router from '../router'
import axios from 'axios'

// URL and endpoint constants
const API_URL = 'https://gradusunum-mainframe-api.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/sign_in/'
const SIGNUP_URL = API_URL + 'auth/sign_up/'
const localStorage = window.localStorage

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then(function (response) {
        console.log('Logging in');
        localStorage.setItem('access-token', response.headers['access-token'])
        localStorage.setItem('uid', response.headers['uid'])
        localStorage.setItem('client', response.headers['client'])
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios.post(LOGIN_URL, creds, (data) => {
    //   console.log("LOGGING IN")
    //   console.log(data);
    //   // localStorage.setItem('access_token', data.auth_headers.access_token)
    //   // localStorage.setItem('uid', data.auth_headers.uid)
    //   // localStorage.setItem('client', data.auth_headers.uid)

    //   // this.user.authenticated = true

    //   // Redirect to a specified route
    //   if(redirect) {
    //     $router.push({path: redirect})       
    //   }
    // })
  },

  signup(context, creds, redirect) {
    context.axios.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if(redirect) {
        context.$router.push({path: redirect})      
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  getToken () {
    return localStorage.id_token
  },

  loggedIn () {
    return !!localStorage.id_token
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}