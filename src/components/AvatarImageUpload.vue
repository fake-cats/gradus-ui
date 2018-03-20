<template>
  <div class="avatarimageupload">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <!-- <input type="file" id="file" ref="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file"> -->
        <input type="file" id="file" ref="file" :disabled="isSaving" @change="filesChange()" accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag an image here<br>to set your avatar pic<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>

    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
        <li v-for="item in uploadedFiles">
          <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
        </li>
      </ul>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Upload failed</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import store from '../store'
  import { upload } from '../api/avatar-image-upload.service';

  const HTTP = axios.create({
    baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
    headers: {
      'Authorization': 'Bearer' + ' ' + store.state.jwt
    }
  });

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'avatarimageupload',
    data () {
      return {
        fileCount: null,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        file: '',
        showPreview: false,
        imagePreview: '',
        uploadFieldName: 'photos'
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
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        // var params = { image: this.image, set_as_profile_image: store.state.profile_id };
        upload(formData)
          .then(response => {
            console.log(response)
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
          console.log(err)
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData();
        this.image = this.$refs.file.files[0];

        formData.append('image', this.image);
        formData.append('set_as_profile_image', 1)

        this.save(formData);
      },
      previewImage: function(event) {
          // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                this.imageData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
      }
    },
    mounted() {
      this.reset();
    },
  }
</script>

<style lang="scss">
  .avatarimageupload {
    padding: 0 30px;
  }

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: #F5F5F5;
    color: dimgray;
    padding: 10px 10px;
    min-height: 50px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 50px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: #EEF7FA; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 20px 0;
  }
</style>