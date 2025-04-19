import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import iziToast from 'izitoast';

const searchWord = document.querySelector('input[name=search-text]');
document.querySelector(".form").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    clearGallery();

    if (searchWord.value !== "") {
        try {
            const data = await getImagesByQuery(searchWord.value);
            if (data.length === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
            } else {
                createGallery(data);
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            hideLoader();
        }
    }
});