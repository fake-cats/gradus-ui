<template>
	<div class="profile">
		
	</div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'

  
  export default {
    name: 'profile',
    data () {
      return {
      	profile_id: this.$route.params.id
      }
    },
  }
</script>

<style>
	
</style>