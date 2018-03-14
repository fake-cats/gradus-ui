<template>
	
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
      	friend_id: this.$route.params.id,
      	loading: false
      }
    },
    beforeMount () {
      console.log("BEFORE MOUNT")
      this.getProfile()
    },
  }
</script>