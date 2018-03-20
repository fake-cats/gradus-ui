<template>
  <div v-if="isLoggedIn === true" class="createpost"> 
	  <div class="col-sm-2">

	  </div>
	  <div class="col-sm-8">
	  	<ul v-if="errors  && errors.length">
	  		 <li v-for="error of errors">
	      {{error.message}}
	    </li>
	  	</ul>
	  	<div class="form-group">
	  	  <input 
	  	  type="text"
	  	  class="form-control"
	      placeholder="Title"
	  	  v-model="postTitle">
	  	</div>
	  	<div class="form-group">
		  <textarea rows="4" cols="50"
		  type="text"
	  	  class="form-control"
	      placeholder="Write here..."
	      v-model="postBody">
	      </textarea>
		</div>
		<imageupload></imageupload>
		<button type="button" class="btn btn-primary" @click="createPost()">Post</button>
	  </div>
	  <div class="col-sm-2">

	  </div>
  </div>
</template>

<script>
	import axios from 'axios'
	import store from '../store'
	import imageupload from './ImageUpload'
	import { CREATE_POST_API_ENDPOINT } from '../api/endpoints'

	  

	export default {
	  name: 'createpost',
	  data() {
	    return {
	      postTitle: '',
	      postBody: '',
	      postImage: null,
	      postTags: [],
	      postType: 'Post',
	      errors: []
	    }
	  },
	  computed: {
        isLoggedIn () {
          return store.getters.isLoggedIn
        }
      },
	  methods: {

		  // Pushes posts to the server when called.
		  createPost() {
		  	console.log(store.state)
		    HTTP.post(CREATE_POST_API_ENDPOINT, 
		      {
			      title: this.postTitle,
			      body: this.postBody,
			      image: this.postImage,
			      tags: this.postTags,
			      type: this.postType
		  	  },
		      { 
		      	headers: { 
		      		'Authorization': 'Bearer' + ' ' + store.state.jwt
		      	}
		      }
		    )
		    .then(response => { console.log(response)})
		    .catch(e => {
		      this.errors.push(e)
		    })
		  }
	  },
	  components: {
	  	imageupload: imageupload
	  }
	}
</script>

<style>
	.createpost {
		padding-top: 60px;
	}

	textarea {
	   resize: none;
	}
</style>