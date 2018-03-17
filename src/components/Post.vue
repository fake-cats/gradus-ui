<template>
  <div class="post">
    <main>

    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-12 cards">
          <div class="col-sm-4">
             <img src="https://i.redd.it/4xlgwzf4v8f01.png" class="img-responsive" alt="Random images placeholder">
             <postvote></postvote>
             <h3>votes {{ post.cached_votes_total }}</h3>
          </div>
          <div class="col-sm-8">
            <h1>{{ post.title }}</h1>
            <router-link :to="{ name: 'profile', params: { id: author_id }}" :id="author_id">
              <h3>by {{ post.author }}</h3>
            </router-link>
            <p>{{ post.created_at | formatUtc }}</p>
            <p>{{ post.body }}</p>
            <p>{{ post.user_id }}</p>
          </div>
        </div>
      </div>
    </div>
      <comments></comments>
    </main>
  </div>
</template>


<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'
  import postvote from './PostVote'
  import comments from './Comments'

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  export default {
    name: 'post',
    data () {
      return {
        post: '',
        author_id: {},
        post_id: {},
        loading: false
      }
    },
    beforeMount () {
      console.log("BEFORE MOUNT")
      this.getPost()
    },
    methods: {
      getPost: function () {
        console.log("RUNNING GET POST");
        this.loading = true;
        var postId = this.$route.params.id;
        HTTP.get('posts/' + postId, function (response) {
          console.log("GETTING POST")
          console.log(response)
          this.$set('post', response.data)
        })
        .then((response)  =>  {
          this.loading = false;
          this.post = response.data;
          this.post_id = response.data.id;
          this.author_id = response.data.author_id;
        }, (error)  =>  {
          this.loading = false;
        })
      }
    },
    filters: {
      formatUtc: function (value) {
        if (value) {
          return moment.utc(value).format('MMM Do YYYY hh:mm')
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
      comments: comments,
      postvote: postvote
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }

  #post {
    font-family: 'Merriweather', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
    margin-top: 40px;
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
    min-height:250px;
  }
   .cards:hover {
    transform: translateY(-0.5em);
    background: #EBEBEB;
  }


  .cards {
    font-weight: bold;
    column-count: 1;
    column-gap: 1em;
    margin-top: 25px;

  }
</style>