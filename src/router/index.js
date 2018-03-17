import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import api from '../api'
import Login from '../components/Login'
import Home from '../components/Home'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import Profile from '../components/Profile'
import ProfileMe from '../components/ProfileMe'
import Comments from '../components/Comments'
import CommentCreate from '../components/CommentCreate'



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
      component: Profile,
      props: true
    },
    { 
      path: '/:username',
      name: 'profileme',
      beforeEnter: requireAuth,
      component: ProfileMe
    },
    { 
      path: '/create/post',
      name: 'createpost',
      beforeEnter: requireAuth,
      component: CreatePost
    },
    { path: '*', component: CreatePost }
  ]
})

router.beforeEach((to, from, next) => {
    let isDelegated = false;

    for (let matched = (to.matched || []), i = matched.length; i--;) {
        let route = matched[i];

        if (route.meta.beforeEach) {
            isDelegated = true;
            route.meta.beforeEach(to, from, next);
        }
    }

    !isDelegated && next();
});

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