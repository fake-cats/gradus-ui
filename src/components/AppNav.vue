<template>
  <header>
    <div class="col-sm-2">
      <span><router-link to="/createpost">Create Post</router-link></span>
    </div>
    <div class="col-sm-8">
      <span><router-link to="/" exact>AppNav</router-link></span>
    </div>
    <div class="col-sm-2 login">
      <ul>
        <li v-if="isLoggedIn === false">
          <button class="btn btn-secondary" id="show-modal" @click="showModal = true">Login</button>
        </li>
        <li v-else>
          <button class="btn btn-secondary" v-on:click="logout()">Log out</button>
        </li>
      </ul>
    </div>
    <login v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">Login</h3>
    </login>
  </header>
</template>

<script>
  import store from '../store'
  import login from './Login'

  export default {
    data () {
      return {
        loading: false,
        showModal: false
      }
    },
    computed: {
      isLoggedIn () {
        return store.getters.isLoggedIn
      }
    },
    methods: {
      logout() {
        console.log("LOGOUT")
        store.dispatch("logout");
        this.loggedIn = false
      }
    },
    components: { 
      login: login
    }
  }
</script>

<style>
  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  .login ul{
    list-style-type: none;
    padding-top: 10px;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>