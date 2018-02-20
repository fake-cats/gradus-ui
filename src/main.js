import Vue from 'vue'
import router from './router'
import App from './components/App'

new Vue({
  el: '#app',
  created: function () {
    window.Vue = this
  },
  router,
  render: h => h(App)
})