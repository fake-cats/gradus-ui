import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../auth'
import store from '../store'
import Login from '../components/Login'
import Home from '../components/Home'
import Post from '../components/Post'


Vue.use(VueRouter)

auth.checkAuth()
//Global Authorization
//Vue.http.headers.common['Authorization'] = auth.getAuthHeader();


const router = new VueRouter({
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
      path: '/logout',
      beforeEnter (to, from, next) {
      auth.logout()
      next('/')
      }
    }
  ]
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const afterAuth = (_to, from, next) => {
  if (auth.user.authenticated) {
    next(from.path)
  } else {
    next()
  }
}

const app = new Vue({
  router
}).$mount('#app')

export default router