import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import Store from '../store'
import api from '../api'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ANONYMOUS_USER = {
  name: 'Anonymous',
}
const DEFAULT_HEADERS = {}
const FIRST_DEGREE_POSTS = "FIRST_DEGREE_POSTS";

const HTTP = axios.create({
  baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default new Vuex.Store({
  state: {
    user: ANONYMOUS_USER,
    isLoggedIn: !!localStorage.getItem('jwt'),
    access_token: localStorage.getItem('jwt') || DEFAULT_HEADERS,
    firstDegreePosts: []
  },
  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state, data) {
      state.user = data.user;
      state.jwt = data.jwt;
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.user = ANONYMOUS_USER;
      state.jwt = null;
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
        HTTP.get('user_token')
          .then(function (response) {
            var jwt = response.headers['jwt'];
            localStorage.setItem('jwt', jwt)
            var userData = {
              user: response.data.data,
              jwt: jwt
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
            "access-token": store.state.access_token,
            "uid": store.state.uid,
            "client": store.state.client
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
    logout({
      commit
    }) {
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  }
});