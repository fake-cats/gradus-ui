import Vue from 'vue'
import axios from 'axios'
import router from '../router'

export const HTTP = axios.create({
  baseURL: 'https://gradusunum-mainframe-api.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  }
})

