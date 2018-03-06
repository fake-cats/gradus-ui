<template>
  <div id="createPost">
	<input type="text" v-model="postBody">
	<button type="button" class="btn btn-primary" @click="createPost()">Post</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      postBody: ''
      // errors: []
    }
  },

  methods: {

	  // Pushes posts to the server when called.
	  createPost() {
	    axios.post(`https://gradusunum-mainframe-api.herokuapp.com/posts`, {
	    headers: {
	      // localStorage.getItem('authHeaders')
	    },
	      body: this.postBody
	    })
	    .then(response => {})
	    // .catch(e => {
	    //   this.errors.push(e)
	    // })

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