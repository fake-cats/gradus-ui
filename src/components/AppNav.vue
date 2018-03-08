<template>
  <header>
    <nav>
      <!-- <div class="col-sm-2">
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
        <h3 slot="header">Login</h3>
      </login> -->
      <ul>
        <!-- <router-link to="/createpost">Create Post</router-link> -->
        <li>
          <a href="#/createpost">Create Post</a>
        </li>
        <router-link to="/" exact>AppNav</router-link>
        <li v-if="isLoggedIn === false">
          <button class="btn btn-secondary" id="show-modal" @click="showModal = true">Login</button>
        </li>
        <li v-else>
          <button class="btn btn-secondary" v-on:click="logout()">Log out</button>
        </li>
      </ul>
      <login v-if="showModal" @close="showModal = false">
        <h3 slot="header">Login</h3>
      </login>
    </nav>
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
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 1000;
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

  nav {
    max-width: 1200px;
    /* The mask-image gives us some extra fading. It is not necessary but without this, you can't face out the box-shadows. This clips our menu */
    mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%);
    margin: 0 auto;
    /* Using padding instead of margin for the top and bottom here will keep our box-shadow visible and not affected by the mask-image */
    padding: 0;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 1000;

  }

  nav ul {
    text-align: center;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 1px 1px 8px rgba(102,102,102,0.3);
    border-bottom: 1px solid #e2e2e2;
    height: 50px;
  }

  nav ul li {
    display: inline-block;
  }

  nav ul li a {
    padding: 5px;
    color: rgba(0, 0, 0, 0.5);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
    font-size: 25px;
    text-decoration: none;
    display: block;
  }

  nav ul li a:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.1);
    color: rgba(0, 0, 0, 0.7);
  }
</style>

