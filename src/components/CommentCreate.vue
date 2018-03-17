<template>
  <div class="col-sm-12 commentcreate" id="commentcreate">
    <ul v-if="errors  && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
    <div class="form-group">
      <textarea rows="4" cols="50"
        type="text"
        class="form-control"
        placeholder="Write here..."
        v-model="commentBody">
      </textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="createComment()">Comment</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  export default {
    name: 'commentcreate',
    data () {
      return {
        commentBody: '',
        errors: []
      }
    },
    methods: {
      createComment() {
        var postId = this.$route.params.id;
        HTTP.post('comments', {
          commentable_type: 'Post',
          commentable_id: postId,
          comment_text: this.commentBody
        },
        { 
          headers: { 
            'Authorization': 'Bearer' + ' ' + store.state.jwt
          }
        }
      )
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
}
</script>

<style>
  textarea {
     resize: none;
  }
</style>