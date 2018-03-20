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
const ANONYMOUS_NAME = "Anonymous";
const DEFAULT_HEADERS = {}
const FIRST_DEGREE_POSTS = "FIRST_DEGREE_POSTS";
const BASE_URL = 'https://gradusunum-mainframe-api.herokuapp.com/'

const HTTP = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default new Vuex.Store({
  state: {
    user: ANONYMOUS_USER,
    username: localStorage.getItem('username'),
    profile_id: localStorage.getItem('profile_id'),
    isLoggedIn: !!localStorage.getItem('jwt'),
    jwt: localStorage.getItem('jwt') || DEFAULT_HEADERS,
    postImage: localStorage.getItem('postImage'),
    firstDegreePosts: []
  },
  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state, data) {
      state.user = data.user;
      state.jwt = data.jwt;
      state.username = data.user.name;
      state.profile_id = data.user.id;
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.user = ANONYMOUS_USER;
      state.jwt = null;
      state.username = ANONYMOUS_NAME;
      state.profile_id = null;
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
    }, auth) {
      console.log("login...", auth);
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        HTTP.post('user_token', {auth})
          .then(function (response) {
            var jwt = response.data['jwt'];
            localStorage.setItem('jwt', jwt)
            var username = response.data.user.name;
            localStorage.setItem('username', username)
            var profile_id = response.data.user.id;
            localStorage.setItem('profile_id', profile_id)
            var userData = {
              user: response.data.user,
              jwt: response.data.jwt
            }
            commit(LOGIN_SUCCESS, userData);
          })
          .catch(function (error) {
            console.log(error);
          });     
      });
    },
    signup({
      state,
      commit,
      rootState
    }, creds) {
      console.log("signup...", creds);
      return new Promise(resolve => {
      HTTP.post('api/v0/sign_up', creds)
      .then(function (response) {
            console.log(response.data.jwt)
            var jwt = response.data['jwt'];
            localStorage.setItem('jwt', jwt)
            var username = response.data.user.name;
            localStorage.setItem('username', username)
            var userData = {
              user: response.data.user,
              jwt: response.data.jwt
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
        HTTP.get('posts/first_degree_friends', { headers: { 
            "jwt": store.state.jwt
          }
        })
          .then(function (response) {
            var postData = { posts: response.data }
            commit(FIRST_DEGREE_POSTS, postData);
          })
          .catch(function (error) {
            console.log(error);
          });     
      });
    },
    postImage({
      state,
      commit,
      rootState
    }) {

    },
    logout({
      commit
    }) {
      localStorage.removeItem('jwt')
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  }
});