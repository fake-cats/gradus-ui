import * as axios from 'axios';
import store from '../store'

const API_URL = 'https://gradusunum-mainframe-api.herokuapp.com';
const UI_URL = "https://gradus-ui.herokuapp.com"

function upload(formData) {
    const url = `${BASE_URL}/api/v0/images/upload`;
    console.log(formData);
    return axios.post(url, formData, { 
      	headers: { 
      		'Authorization': 'Bearer' + ' ' + store.state.jwt
      	}
      })
    // get data
    .then(x => x.data)
    // add url field
    .then(x => x.map(img => Object.assign({},
        img, { url: `${UI_URL}/images/${img.id}` })));

}

export { upload }