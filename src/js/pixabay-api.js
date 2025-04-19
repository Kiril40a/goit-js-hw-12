import axios from 'axios';
export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: '49815618-f39b281f22944c1de1a6cd368',
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true'
            }
        });
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}
