<template>
	<div class="profile">
		ok
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
      	profile: '',
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
        HTTP.get('/api/v0/users/' + profile_id, function (response) {
          console.log("GETTING PROFILE")
          console.log(response)
          this.$set('profile', response.data)
        })
        .then((response)  =>  {
          this.loading = false;
          this.post = response.data;
        }, (error)  =>  {
          this.loading = false;
        })
      }
    },
  }
</script>