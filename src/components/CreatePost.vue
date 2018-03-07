<template>
  <div id="createPost"> 
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
		<button type="button" class="btn btn-primary" @click="createPost()">Post</button>
	  </div>
	  <div class="col-sm-2">

	  </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store'

export default {
  data() {
    return {
      postTitle: '',
      postBody: '',
      errors: []
    }
  },

  methods: {

	  // Pushes posts to the server when called.
	  createPost() {
	  	console.log(localStorage.getItem('access-token'))
	    axios.post('https://gradusunum-mainframe-api.herokuapp.com/posts', {
	      title: this.postTitle,
	      body: this.postBody
	  	},
	      { headers: { 
	      		access_token: store.state.access_token,
	      		uid: store.state.uid,
	      		client: store.state.client
	      		}
	       }
	    )
	    .then(response => { console.log(response)})
	    .catch(e => {
	      this.errors.push(e)
	    })

	    // async / await version (createPost() becomes async createPost())
	    //
	    // try {
	    //   await axios.post(`https://gradusunum-mainframe-api.herokuapp.com/posts`, {
	    //     body: this.postBody
	    //   })
	    // } catch (e) {
	    //   this.errors.push(e)
	    // }
	  }
  }
}
</script>

<style type="text/css">
	#createPost {
		padding-top: 30px;
	}

	textarea {
	   resize: none;
	}
</style>