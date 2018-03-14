<template>
<div class="profileme">
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
  	  	  Friend Requests
  	    </h2>
        <div v-for="friendRequest in friendRequests" :key="friendRequest.id">
  	  	  <router-link :to="{ name: 'profile', params: { id: friendRequest.id }}">
  	        <h3>
  	          {{friendRequest.name}}
  	        </h3>
  	      </router-link>
          <button class="btn btn-secondary" @click="acceptRequest(friendRequest.id)">Accept {{friendRequest.name}}</button>
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
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  export default {
    name: 'profileme',
    data () {
      return {
      	profile: {},
      	friends: [],
        friendRequests: [],
      	posts: [],
      	friend_id: this.$route.params.id,
        profile_id: store.state.profile_id,
      	loading: false
      }
    },
    beforeMount () {
      console.log("BEFORE MOUNT")
      this.getProfile()
      this.requestedFriends()
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
  	      id: store.state.profile_id
  	  	  },
  	      { 
  	      	headers: { 
  	      		'Authorization': 'Bearer' + ' ' + store.state.jwt
  	      	}
  	      }
  	    )
      },
      requestedFriends: function () {
        console.log("REQUESTED FRIENDS");
        this.loading = true;
        HTTP.get('requested_friends/', 
          { 
            headers: { 
              'Authorization': 'Bearer' + ' ' + store.state.jwt
            }
          }
        )
        .then((response)  =>  {
          this.loading = false;
          this.friendRequests = response.data;
        }, (error)  =>  {
          this.loading = false;
        })
      },
      acceptRequest: function (id) {
        console.log("ACCEPT REQUEST");
        this.loading = true;
        HTTP.post('accept_request/', {
          friend_id: id
          },
          { 
            headers: { 
              'Authorization': 'Bearer' + ' ' + store.state.jwt
            }
          }
        )
      },
    }
  }
</script>