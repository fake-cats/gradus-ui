import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import Store from '../store'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ANONYMOUS_USER = {
  name: 'Anonymous',
}
const DEFAULT_HEADERS = {}
const FIRST_DEGREE_POSTS = "FIRST_DEGREE_POSTS";

export default new Vuex.Store({
  state: {
    user: ANONYMOUS_USER,
    isLoggedIn: !!localStorage.getItem('access-token'),
    // authHeaders: localStorage.getItem('authHeaders') || DEFAULT_HEADERS,
    access_token: localStorage.getItem('access-token'),
    uid: localStorage.getItem('uid'),
    client: localStorage.getItem('client'),
    firstDegreePosts: []
  },
  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state, data) {
      state.user = data.user;
      state.authHeaders = data.authHeaders;
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.user = ANONYMOUS_USER;
      state.authHeaders = {};
      state.isLoggedIn = false;
    },
    [FIRST_DEGREE_POSTS](state, data) {
      state.firstDegreePosts = data.posts
    }
  },
  actions: {
    login({
      state,
      commit,
      rootState
    }, creds) {
      console.log("login...", creds);
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        axios.post('https://gradusunum-mainframe-api.herokuapp.com/auth/sign_in', creds)
          .then(function (response) {
            var access_token = response.headers['access-token'];
            var uid = response.headers['uid'];
            var client = response.headers['client'];
            localStorage.setItem('access-token', access_token),
            localStorage.setItem('uid', uid),
            localStorage.setItem('client', client)
            var userData = {
              user: response.data.data,
              access_token: access_token,
              uid: uid,
              client: client
            }
            commit(LOGIN_SUCCESS, userData);
          })
          .catch(function (error) {
            console.log(error);
          });     
      });
    },
    getFirstDegreePosts({
      state,
      commit,
      rootState
    }) {
      console.log("getting first degree posts...");
      return new Promise(resolve => {
        axios.get('https://gradusunum-mainframe-api.herokuapp.com/posts/first_degree_friends', { headers: state.authHeaders })
          .then(function (response) {
            var postData = { posts: response.data }
            commit(FIRST_DEGREE_POSTS, postData);
          })
          .catch(function (error) {
            console.log(error);
          });     
      });
    },
    logout({
      commit
    }) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('uid');
      localStorage.removeItem('client');
      commit(LOGOUT);
      console.log("LOGOUT")
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  }
});