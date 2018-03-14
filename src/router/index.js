import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import api from '../api'
import Login from '../components/Login'
import Home from '../components/Home'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import Profile from '../components/Profile'
// import ProfileMe from '../components/ProfileMe'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { 
      path: '/post/:id',
      name: 'post',
      beforeEnter: requireAuth,
      component: Post
    },
    { 
      path: '/login', 
      component: Login
    },
    { 
      path: '/profile/:id',
      name: 'profile',
      beforeEnter: requireAuth,
      component: Profile
    },
    // { 
    //   path: '/:username',
    //   name: 'profileme',
    //   beforeEnter: requireAuth,
    //   component: ProfileMe
    // },
    { 
      path: '/create/post',
      name: 'createpost',
      beforeEnter: requireAuth,
      component: CreatePost
    }
  ]
})

function requireAuth (to, from, next) {
  if (store.getters.isLoggedIn === false) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const afterAuth = (_to, from, next) => {
  if (store.getters.isLoggedIn === true) {
    next(from.path)
  } else {
    next()
  }
}

const app = new Vue({
  router
}).$mount('#app')

export default router