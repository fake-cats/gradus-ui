<template>
  <div class="signup">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Sign Up
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="name"
                    @keyup.enter="$emit('close', submit())"
                  >
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Email"
                    v-model="email"
                    @keyup.enter="$emit('close', submit())"
                  >
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    v-model="password"
                    @keyup.enter="$emit('close', submit())"
                  >
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button type="submit" class="btn btn-primary" @click="$emit('close')">Login</button>
                <button type="button" class="btn btn-secondary" @click="$emit('close', submit())">Sign Up</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import store from '../store'
  import axios from 'axios'

  export default {
    name: 'signup',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: ''
      }
    },

    methods: {
      submit() {
        store.dispatch("signup", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$router.push('/')
      }
    }
  }
</script>


<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }
</style>