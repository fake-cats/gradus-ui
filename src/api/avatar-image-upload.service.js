import * as axios from 'axios';
import store from '../store'

const API_URL = 'https://gradusunum-mainframe-api.herokuapp.com';
const UI_URL = "https://gradus-ui.herokuapp.com"

function upload(formData) {
  const url = `${API_URL}/api/v0/images/upload`;
  console.log(formData);
  return axios.post(url, formData, { 
    	headers: { 
    		'Authorization': 'Bearer' + ' ' + store.state.jwt,
    		'Content-Type': 'multipart/form-data'
    	}
    })

  .then(function (response) {
    var response = response.data;
  })
}

export { upload }