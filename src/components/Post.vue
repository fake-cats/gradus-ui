<template>
  <div class="post">
    <main>

    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="wrapper">
      <div class="row">
        <div class="col-sm-12 cards">
          <div class="col-sm-4">
             <img src="https://c1.staticflickr.com/2/1467/25292000313_3ca22bf530_n.jpg" class="img-responsive" alt="Random images placeholder">
          </div>
          <div class="col-sm-8">
            <h1>{{ post.title }}</h1>
            <h3>by {{ post.author }}</h3>
            <h3>votes {{ post.cached_votes_total }}</h3>
            <p>{{ post.created_at | formatUtc }}</p>
            <p>{{ post.body }}</p>
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

  export default {
    name: 'post',
    data () {
      return {
        post: null,
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
        axios.get("https://gradusunum-mainframe-api.herokuapp.com/posts/" + postId, function (response) {
          console.log("GETTING POST")
          console.log(response)
          this.$set('post', response.data)
        })
        .then((response)  =>  {
          this.loading = false;
          this.post = response.data;
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
  }
</script>

<style>
  body {
    margin: 0;
  }

  #post {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
    height:400px;
  }
   .cards:hover {
    transform: translateY(-0.5em);
    background: #EBEBEB;
  }


  .cards {
     column-count: 1;
    column-gap: 1em;
      margin-top: 70px;

  }
</style>