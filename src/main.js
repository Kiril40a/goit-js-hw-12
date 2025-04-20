import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import iziToast from 'izitoast';

const form = document.querySelector(".form");
const searchInput = document.querySelector('input[name=search-text]');
const loadMoreButton = document.querySelector(".load-more");
let searchWord = '';
let totalHits = 0;
let page = 0;
let searchTimeout;

const toastConfig = {
  position: 'topRight',
  backgroundColor: 'rgba(255, 0, 0, 0.6)',
  timeout: 3000,
};

const showError = (message) => {
  iziToast.show({
    ...toastConfig,
    message,
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearTimeout(searchTimeout);

  searchWord = searchInput.value.trim();
  if (!searchWord) {
    hideLoader();
    showError('The search field cannot be empty');
    return;
  }

  searchTimeout = setTimeout(async () => {
    try {
      clearGallery();
      hideLoadMoreButton();
      showLoader();
      page = 1;

      const data = await getImagesByQuery(searchWord, page);

      if (!data.hits || data.hits.length === 0) {
        showError('Sorry, there are no images matching your search query. Please try again!');
      } else {
        createGallery(data.hits);
        totalHits = data.totalHits;
      }
    } catch (error) {
      console.error('Search error:', error);
      showError('An error occurred while fetching images');
    } finally {
      hideLoader();
      if (totalHits > 15) {
        showLoadMoreButton();
      } else if (totalHits > 0) {
        showError("We're sorry, but you've reached the end of search results.");
      }
    }
  }, 300);
});

loadMoreButton.addEventListener("click", async (e) => {
  e.preventDefault();
  showLoader();
  hideLoadMoreButton();
  page += 1;

  try {
    const data = await getImagesByQuery(searchWord, page);

    if (!data.hits || data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
      createGallery(data.hits);
    }

    if (totalHits <= page * 15) {
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }

    const heightCard = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;
    window.scrollBy({
      top: heightCard * 2,
      behavior: "smooth",
    });
  } catch (error) {
    console.error('Load more error:', error);
    showError('An error occurred while fetching more images');
  } finally {
    hideLoader();
  }
});