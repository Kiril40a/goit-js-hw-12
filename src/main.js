import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import iziToast from 'izitoast';

const searchinput = document.querySelector('input[name=search-text]');
let searchWord;
let totalHits;
let page = 0;
document.querySelector(".form").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    clearGallery();
    hideLoadMoreButton()
    
    page = 1;
    searchWord = searchinput.value;
    if (searchWord !== "") {
        try {
            const data = await getImagesByQuery(searchWord, page);
            if (data.hits.length === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
            } else {
                createGallery(data.hits);
            }
            totalHits = data.totalHits;
            
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            hideLoader();
            if (totalHits > 15) {
                showLoadMoreButton();
            } else {
                iziToast.show({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
            }
        }
    }
});
document.querySelector(".load-more").addEventListener("click", async (e) => {
    e.preventDefault();
    showLoader();
    hideLoadMoreButton()

    page +=1;
    try {
            const data = await getImagesByQuery(searchWord, page);
            if (data.hits.length === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
            } else {
                createGallery(data.hits);
        }
        if (totalHits <= (page) * 15) {
            hideLoadMoreButton();
            iziToast.show({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                    backgroundColor: 'rgba(255, 0, 0, .6)'
                });
        } else {
            showLoadMoreButton();
        }

        let heightCard = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({
            top: heightCard * 2,
            behavior: "smooth",
        });

        } catch (error) {
            console.error('Error: ', error);
        } finally {
            hideLoader();
    }
})