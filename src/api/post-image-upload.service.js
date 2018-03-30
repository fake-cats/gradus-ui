import * as axios from 'axios';
import store from '../store'

function upload(formData) {
    const photos = formData.getAll('photos');
    const promises = photos.map((x) => getImage(x))

        // .then(img => ({
        //     id: img,
        //     originalName: x.name,
        //     fileName: x.name,
        //     url: img
        // })));
    // return Promise.all(promises);
}

function getImage(file) {
    const reader = new FileReader();
    const img = document.createElement('img');

    reader.onload = function() {
        console.log(reader.result)
        img.src = reader.result;
        // resolve(getBase64Image(img));
    }

    reader.readAsDataURL(file);
}

function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png');

    return dataURL;
}

export { upload }