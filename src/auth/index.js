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
        
        // this.user.authenticated = true
      })
      .catch(function (error) {
        console.log(error);
      });

      // Redirect to a specified route
      if(redirect) {
        console.log("redirect")
        router.push({ name: 'post', params: {redirect} })       
      }
  },

  signup(context, creds, redirect) {
    context.axios.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)  
        // context.$router.push({path: redirect})      
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('uid')
    localStorage.removeItem('client')
    this.user.authenticated = false
  },

  getToken () {
    return localStorage['access-token']
  },

  loggedIn () {
    return !!localStorage['access-token']
  },

  checkAuth() {
    var tokens = localStorage.getItem('access-token') && localStorage.getItem('uid') && localStorage.getItem('client')
    if(tokens) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access-token')
    }
  }
}