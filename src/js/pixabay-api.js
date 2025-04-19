import axios from 'axios';
export function getImagesByQuery(query) {
    return axios.get('https://pixabay.com/api/', {
        params: {
            key: '49815618-f39b281f22944c1de1a6cd368',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true'
        }
    })
        .then(response => {
            return response.data.hits;
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}
