import * as axios from 'axios';

const BASE_URL = 'https://gradusunum-mainframe-api.herokuapp.com';

function upload(formData) {
    const url = `${BASE_URL}/api/v0/images/upload`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }