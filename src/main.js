import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";
import iziToast from 'izitoast';

let searchWord = document.querySelector('input[name=search-text]');
document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    showLoader();
    clearGallery();
    if (searchWord.value != "") {
        getImagesByQuery(searchWord.value)
            .then((data) => {
                if (data.length === 0) {
                    iziToast.show({
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight',
                        backgroundColor: 'rgba(255, 0, 0, .6)'
                    });
                } else {
                    createGallery(data);
                }
                hideLoader();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
    
})