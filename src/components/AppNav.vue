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
        <router-link class="navvy" to="/" exact>
          <img src="https://3.bp.blogspot.com/-ElkEhTV4rgs/V0OSpOYMrnI/AAAAAAAAA9o/lxqm4OG87HonevjiY1BUH3aIIM4K2_V5gCLcB/s1600/R.jpg" alt="logo">
        </router-link>
        <!-- <router-link to="/createpost">Create Post</router-link> -->
        <!-- <router-link :to="{ name: 'profileme', params: { username: username }}">
          <a>Profile</a>
        </router-link> -->
        <div v-if="isLoggedIn === false" class="login">
          <button class="btn btn-secondary" id="show-modal" @click="signupModal = true">Sign Up</button>
          <button class="btn btn-secondary" id="show-modal" @click="loginModal = true">Login</button>
        </div>
        <div v-else class="login">
          <img :src="navatar" class="avatar" alt="Avatar" @click="toggleSidebar()">
        </div>
      </ul>
      <login v-if="loginModal" @close="loginModal = false">
        <h3 slot="header">Login</h3>
      </login>
      <signup v-if="signupModal" @close="signupModal = false">
        <h3 slot="header">Sign Up</h3>
      </signup>
    </nav>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
      <router-link to="/" exact>Home</router-link>
      <router-link :to="{ name: 'profileme', params: { username: username }}" v-on:click.native="closeNav()">
        Profile
      </router-link>
      <router-link :to="{ name: 'createpost'}" v-on:click.native="closeNav()">Create Post</router-link>
      <router-link :to="{ name: 'profileme', params: { username: username }}" v-on:click.native="closeNav()">Friends</router-link>
      <router-link :to="{ name: 'profileme', params: { username: username }}" v-on:click.native="closeNav()">Posts</router-link>
      <a @click="logout()">Sign Out</a>
    </div>
  </header>
</template>

<script>
  import store from '../store'
  import login from './Login'
  import signup from './SignUp'

  export default {
    data () {
      return {
        loading: false,
        avatarActive: false,
        loginModal: false,
        signupModal: false,
        navatar: store.state.profile_image_url,
        username: store.state.username
      }
    },
    computed: {
      isLoggedIn () {
        return store.getters.isLoggedIn
      }
    },
    methods: {
      closeNav() {
        var avatarActive = this.avatarActive;
        document.getElementById("mySidenav").style.width = "0";
        this.avatarActive = false;
      },
      logout() {
        console.log("LOGOUT")
        store.dispatch("logout");
        this.loggedIn = false,
        this.closeNav()
      },
      toggleSidebar() {
        var avatarActive = this.avatarActive;
        if (avatarActive === false) {
          document.getElementById("mySidenav").style.width = "250px";
          this.avatarActive = true;
        } else {
          document.getElementById("mySidenav").style.width = "0";
          this.avatarActive = false;
        }
      }
    },
    components: { 
      login: login,
      signup: signup
    }
  }
</script>

<style>
  header {
    font-family: 'Merriweather', serif;
    margin: 0;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    z-index: 1000;
  }
  
  button {
    background: #51B767;
    color: #ffffff;
    padding: 15px;
    border-radius: 0;
    font-weight: bold;
    font-size: 15px;
    border: 0;
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
    font-family: 'Merriweather', serif;
    font-weight: bold;
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

  /* The side navigation menu */
  .sidenav {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1; /* Stay on top */
      top: 20px; /* Stay at the top */
      right: 0;
      background-color: #111; /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  /* The navigation menu links */
  .sidenav a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
      text-align: right;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
      color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
      position: absolute;
      top: 30px;
      right: 200px;
      font-size: 36px;
      margin-left: 50px;
  }

  .navMain {
    height: 0px;
    width: 200px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 60px;}
    .sidenav a {font-size: 18px;}
  }

  .logo {
  }

  .navvy {
    position: absolute;
    left: 20px;
    top: 8px;
  }
  .navvy img {
    height: 34px;
    border-radius: 50%;
  }

  .login img {
    height: 34px;
    border-radius: 50%;
  }

  .login {
    right: 20px;
    top: 8px;
    height: 50px;
    margin: 0;
    position: absolute;
  }
</style>

