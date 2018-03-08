<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Log In
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your email"
                  v-model="credentials.email"
                  @keyup.enter="$emit('close', submit())"
                >
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  v-model="credentials.password"
                  @keyup.enter="$emit('close', submit())"
                >
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">Sign Up</button>
              <button type="submit" class="btn btn-primary" @click="$emit('close', submit())">Login</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<!-- <template>
  <div class="col-sm-4 col-sm-offset-4">

    <h2>Log In</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="login-box">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your email"
          v-model="credentials.email"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
        >
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submit()">Login</button>
    </div>
    <form @submit.prevent="login()">
     <input type="text" class="form-control" placeholder="email" v-model="credentials.email">
     <input type="password" class="form-control" placeholder="password" v-model="credentials.password">
     <button type="submit">Login</button>
    </form>
  </div>
</template> -->

<script>
  import store from '../store'
  import axios from 'axios'

  export default {
    name: 'login',
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {
      submit() {
        store.dispatch("login", {
          email: this.credentials.email,
          password: this.credentials.password
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