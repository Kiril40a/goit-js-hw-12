import SimpleLightbox from 'simplelightbox';

let galleryBox = document.querySelector(".gallery");
let loaderContainer = document.querySelector(".loader-container");
let moreContainer = document.querySelector(".more-container");
export function createGallery(images) {
    let liElements = [];
    images.forEach(elem => {
        let li = document.createElement('li');
        li.classList = 'gallery-item';

        let link = document.createElement('a');
        link.classList = 'gallery-link';
        link.href = elem.largeImageURL;
        link.addEventListener("click", (e) => {
            e.preventDefault();
        })
        let descList = document.createElement('ul');
        descList.classList = 'gallery-item-desc';
        let descLike = document.createElement('li');
        descLike.innerHTML = `<span>Likes: </span><span>${elem.likes}</span>`
        let descView = document.createElement('li');
        descView.innerHTML = `<span>Views: </span><span>${elem.views}</span>`
        let descCom = document.createElement('li');
        descCom.innerHTML = `<span>Comments: </span><span>${elem.comments}</span>`
        let descDown = document.createElement('li');
        descDown.innerHTML = `<span>Downloads: </span><span>${elem.downloads}</span>`
        
        descLike.classList = 'gallery-item-desc-li';
        descView.classList = 'gallery-item-desc-li';
        descCom.classList = 'gallery-item-desc-li';
        descDown.classList = 'gallery-item-desc-li';
        


        let img = document.createElement('img');
        img.classList = 'gallery-image';
        img.src = elem.webformatURL;
        img.alt = elem.tags;

        link.append(img);
        li.append(link);
        descList.append(descLike);
        descList.append(descView);
        descList.append(descCom);
        descList.append(descDown);
        li.append(descList);
        liElements.push(li)
    })

    galleryBox.append(...liElements);
    let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captions: true,
    captionSelector: 'img',
    captionsData: "alt",
    captionPosition: 'bottom',
    animated: true
    });
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