<template>
  <div class="imageupload">
    <!-- <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" accept="image/*" class="input-file" @change="filesChange()">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>

    SUCCESS
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img :src="item.url" class="img-responsive img-thumbnail" height="200px" :alt="item.originalName">
        </li>
      </ul>
    </div>
    FAILED
    <div v-if="isFailed">
      <h2>Upload failed</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div> -->
    <div class="fileinput" v-if="isInitial || isSaving">
      <input type="file" multiple @change="fileAdded" id="fileinput">
      <img-preview v-for="(file, index) in files" :idx="index" :file="file" :key="file.src" v-if="file"></img-preview>
    </div>
    <div v-if="isSuccess">
      <h2>Uploaded successfully</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <img-preview v-for="(file, index) in files" :idx="index" :file="file" :key="file.src" v-if="file"></img-preview>
    </div>
    <div v-if="isFailed">
      <h2>Upload failed</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'
  import imgPreview from './ImgPreview'
  import { upload } from '../api/post-image-upload.service';
  import { wait } from '../api/utils';

  const BASE_URL = 'localhost:8080/'
  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'imageupload',
    data () {
      return {
        uploadError: null,
        currentStatus: null,
        files: null,
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
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.files = null;
        this.src = '';
        this.uploadError = null;
      },
      fileAdded() {
      const input = document.getElementById('fileinput');
      this.files = [...input.files];
      this.currentStatus = STATUS_SUCCESS;
      }
    },
    mounted() {
      this.reset();
    },
    components: { 
      imgPreview: imgPreview
    }
  }

</script>

<style lang="scss" scoped>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: #F5F5F5;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  #fileinput {
    margin: 0 auto;
  }

  .dropbox:hover {
    background: #EEF7FA; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>