<template>
	<div class="imgpreview">
		<img :id="'img-' + idx" :src="src">
	</div>
</template>

<script>
	import store from '../store'

	const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
  name: 'imageupload',
	data() {
    return {
    	currentStatus: null,
      src: ''
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  props: ['file', 'idx'],
  methods: {
    loadPicture(file) {
      let self = this;
      let img = document.getElementById('img');
      var reader = new FileReader();
      reader.onload = function(e) {;
        self.src = e.target.result;
      		
      }
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    console.log('mounted');
    this.loadPicture(this.file);
    
  }
}

</script>

<style scoped>
	.imgpreview {
		height: 300px;
		width: 300px;
		margin: 0 auto;
	}

	.imgpreview img {
		width: 100%;
	}
</style>

