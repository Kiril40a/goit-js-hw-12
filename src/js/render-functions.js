import SimpleLightbox from 'simplelightbox';

let galleryBox = document.querySelector(".gallery");
let loaderContainer = document.querySelector(".loader-container");
let moreContainer = document.querySelector(".more-container");

let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captions: true,
    captionSelector: 'img',
    captionsData: "alt",
    captionPosition: 'bottom',
    animated: true
    });

export function createGallery(images) {
    const fragment = document.createDocumentFragment();

    images.forEach(elem => {
        const li = document.createElement('li');
        li.className = 'gallery-item';

        const link = document.createElement('a');
        link.className = 'gallery-link';
        link.href = elem.largeImageURL;
        link.addEventListener('click', e => e.preventDefault());

        const img = document.createElement('img');
        img.className = 'gallery-image';
        img.src = elem.webformatURL;
        img.alt = elem.tags;

        const descList = document.createElement('ul');
        descList.className = 'gallery-item-desc';

        const descriptions = [
            { label: 'Likes', value: elem.likes },
            { label: 'Views', value: elem.views },
            { label: 'Comments', value: elem.comments },
            { label: 'Downloads', value: elem.downloads }
        ];

        descriptions.forEach(({ label, value }) => {
            const descItem = document.createElement('li');
            descItem.className = 'gallery-item-desc-li';
            descItem.innerHTML = `<span>${label}: </span><span>${value}</span>`;
            descList.append(descItem);
        });

        link.append(img);
        li.append(link, descList);
        fragment.append(li);
    });

    galleryBox.append(fragment);
    gallery.refresh();
}
export function clearGallery() {
    galleryBox.innerHTML = '';
}
export function showLoader() {
    loaderContainer.classList.remove('hidden');
}
export function hideLoader() {
    loaderContainer.classList.add('hidden');
}
export function showLoadMoreButton() {
    moreContainer.classList.remove('hidden');
}
export function hideLoadMoreButton() {
    moreContainer.classList.add('hidden');
}