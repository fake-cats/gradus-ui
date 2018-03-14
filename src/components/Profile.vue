<template>
	<div class="profile">
	  <h1>
	    {{profile.name}}
	  </h1>
	  <button class="btn btn-secondary" @click="addFriend()">Add {{profile.name}}</button>
	  <div class="wrapper">
        <div class="row">
          <div class="col-sm-8">
          <div v-for="post in posts" :key="post.id">
            <div class="col-sm-4 cards">
              <router-link :to="{ name: 'post', params: { id: post.id }}">
               <img src="https://i.redd.it/m2n3tfwiidk01.jpg" class="img-responsive" alt="Random images placeholder"/> 
              <div class="post">
                <h3>{{ post.id }}</h3>
                <p>{{ post.title }}</p>
                <p>{{ post.created_at | formatUtc }}</p>
              </div>
              </router-link>
            </div>
          </div>
          </div>
          <div class="col-sm-4">
          	<h2>
		  	  Friends
		    </h2>
		    <div v-for="friend in friends" :key="friend.id">
		  	  <router-link :to="{ name: 'profile', params: { id: friend.id }}">
		        <h3>
		          {{friend.name}}
		        </h3>
		      </router-link>
		    </div>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  export default {
    name: 'profile',
    data () {
      return {
      	profile: {},
      	friends: [],
      	posts: [],
      	friend_id: this.friend_id,
      	loading: false
      }
    },
    beforeMount () {
      console.log("BEFORE MOUNT")
      this.getProfile()
    },
    methods: {
      getProfile: function () {
        console.log("RUNNING GET PROFILE");
        this.loading = true;
        var profile_id = this.$route.params.id;
        HTTP.get('api/v0/users/' + profile_id)
        .then((response)  =>  {
          this.loading = false;
          this.profile = response.data;
          this.friend_id = response.data.id;
          this.friends = response.data.friends;
          this.posts = response.data.posts;
        }, (error)  =>  {
          this.loading = false;
        })
      },
      addFriend: function () {
      	console.log("ADD FRIEND");
      	this.loading = true;
      	HTTP.post('request_friend/', {
	      friend_id: this.friend_id
	  	  },
	      { 
	      	headers: { 
	      		'Authorization': 'Bearer' + ' ' + store.state.jwt
	      	}
	      }
	    )
      }
    },
  }
</script>

<style>
  .profile {
  	padding-top: 60px;
  }
	
</style>