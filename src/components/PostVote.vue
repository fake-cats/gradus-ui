<template>
  <div class="postvote">
  	<button type="button" class="btn btn-default btn-lg" v-bind:class="{'green' : isUpVote }" @click="postUpVote()">
  	  <span class="glyphicon glyphicon-circle-arrow-up up-vote" aria-hidden="true"></span>
  	</button>
  	<button type="button" class="btn btn-default btn-lg" v-bind:class="{'red' : isDownVote }" @click="postDownVote()">
	  <span class="glyphicon glyphicon-circle-arrow-down downvote" aria-hidden="true"></span>
	</button>
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
    name: 'postvote',
    data () {
      return {
        isUpVote: false,
        isDownVote: false,
        loading: false
      }
    },
    methods: {
      postUpVote() {
	  	console.log("UPVOTE")
	  	var postId = this.$route.params.id;
	    HTTP.post('posts/' + postId + '/upvote', {
	      	headers: { 
	      		'Authorization': 'Bearer' + ' ' + store.state.jwt
	      	}
	      }
	    )
	    .then((response)  =>  {
          this.loading = false;
          this.isUpVote = true;
          this.isDownVote = false;
        })
	  },
	  postDownVote() {
	  	console.log("DOWNVOTE")
	  	var postId = this.$route.params.id;
	    HTTP.post('posts/' + postId + '/downvote', {
	      	headers: { 
	      		'Authorization': 'Bearer' + ' ' + store.state.jwt
	      	}
	      }
	    )
	    .then((response)  =>  {
          this.loading = false;
          this.isDownVote = true;
          this.isUpVote = false;
        })
	  }
    },
  }
 </script>

 <style scoped>
 	.postvote {
		padding-top: 50px;
 	}

 	.green {
 		color: #009900;
 	}

 	.red {
 		color: #990000;
 	}
 </style>