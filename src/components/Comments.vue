<template>
  <div class="comments col-sm-10 col-sm-offset-1">
    <main>
    <div v-if="isLoggedIn === true" class="postcomment">
      <commentcreate></commentcreate>
    </div>
    <div v-else>
      Sign in to comment
    </div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
      <div v-for="comment in comments" class="col-sm-12 cards">
        <div class="col-sm-2">
           <img src="https://i.redd.it/m2n3tfwiidk01.jpg" class="img-responsive" alt="Random images placeholder">
        </div>
        <div class="col-sm-10">
          <p>{{ comment.created_at | formatUtc }}</p>
          <p>{{ comment.body }}</p>
          <p>{{ comment.user_id }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'
  import commentcreate from './CommentCreate'

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  export default {
    name: 'comments',
    data () {
      return {
        comments: [],
        loading: false
      }
    },
    beforeMount () {
      console.log("COMMENTS")
      this.getComments()
    },
    computed: {
      isLoggedIn () {
        return store.getters.isLoggedIn
      }
    },
    methods: {
      getComments: function () {
        this.loading = true;
        var postId = this.$route.params.id;
        HTTP.get('comments?commentable_type=Post&commentable_id=' + postId)
        .then((response)  =>  {
          this.loading = false;
          this.comments = response.data;
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
      commentcreate: commentcreate
    }
  }
</script>

<style scoped>
  p  {
    text-align: left;
  }

  .cards {
    background: #F5F5F5;
    height:100px;
  }
   .cards:hover {
    transform: translateY(-0.5em);
    background: #EBEBEB;
  }


  .cards {
    font-weight: bold;
    column-count: 1;
    column-gap: 1em;
    margin-top: 5px;

  }
</style>