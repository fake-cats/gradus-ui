<template>
  <div id="home">
    <main>
      <div v-if="loading">
        <img src="../assets/loader.gif"/>
        Loading.....
      </div>

      <div class="container">
        <div class="row">
          <div v-for="post in posts" :key="post.id">
            <div class="col-sm-4 cards">
              <router-link :to="{ name: 'post', params: { id: post.id }}" class="postDescription">
               <img src="https://i.redd.it/ts0ouhqjmpe01.jpg" class="img-responsive" alt="Random images placeholder"/> 
              <div class="post">
                <h3>{{ post.id }}</h3>
                <p>{{ post.title }}</p>
                <p>{{ post.created_at | formatUtc }}</p>
              </div>
              </router-link>
              <div class="votes col-sm-12">
                <postvote></postvote>
                <p class="votecount">votes {{ post.cached_votes_total }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>



<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'
  import postvote from './PostVote'

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });
  
  export default {
    name: 'home',
    data () {
      return {
        posts: [],
        loading: false
      }
    },
    beforeMount () {
      console.log("BEFORE MOUNT")
      this.getPosts()
    },
    computed: {
      user () {
        return store.state.user;
      },
      isLoggedIn () {
        return store.getters.isLoggedIn
      },
      authHeaders () {
        return store.state.authHeaders;
      },
      firstDegreePosts () {
        return store.state.firstDegreePosts; 
      }
    },
    methods: {
      getPosts: function () {
        this.loading = true;
        HTTP.get('posts')
        .then((response)  =>  {
          this.loading = false;
          this.posts = response.data;
        }, (error)  =>  {
          this.loading = false;
        })
      },
      getFirstDegreePosts () {
        console.log("GETTING POSTS")
        this.$store.dispatch("getFirstDegreePosts")
      }
    },
    filters: {
      formatUtc: function (value) {
        if (value) {
          return moment.utc(value).format('MMM Do YYYY')
        }
      }
    },
    route: {
      // Check the users auth status before
      // allowing navigation to the route
      canActivate() {
        return auth.user.authenticated
      }
    },
    components: {
      postvote: postvote
    }
  }
</script>





<style>
  body {
    margin: 0;
  }

  #home {
    font-family: 'Karma', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 60px;
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

  .cards {
    background: #F5F5F5;
    height:400px;
  }
   .cards:hover {
    transform: translateY(-0.5em);
    background: #EBEBEB;
  }

  .cards {
    column-count: 1;
    column-gap: 1em;
    margin-top: 20px;

  }

  .post p {
    font-family: 'Merriweather', serif;
    height: 40px;
    overflow: hidden;
  }

  .post {
    height: 90px;
  }

  .cards img {
    display:block;
    margin:auto;
  }

  .postvote {
    margin: 0 auto;
  }

  .votes {
    position: absolute;
    bottom: 5px;
    text-align: right;
  }
</style>