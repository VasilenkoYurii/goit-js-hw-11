import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import NewsApiService from './js/fetchImages';
import renderImageGallery from './js/components/renderImageGallery';
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryImage: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  sentinel: document.querySelector('#sentinel'),
};

const onEntry = entries => {
  entries.forEach(entrie => {
    if (entrie.isIntersecting && newsApiService.query !== '') {
      arrfetchImages();
    }
  });
};
const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', userSearchImages);

function userSearchImages(e) {
  e.preventDefault();
  observer.unobserve(refs.sentinel);

  newsApiService.query = e.srcElement[0].value;

  if (newsApiService.query === '') {
    Notiflix.Notify.failure('Oops, enter image name');
    return;
  }

  newsApiService.fetchImages().then(response => {
    if (response.data.totalHits !== 0) {
      Notiflix.Notify.info(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
  });

  observer.observe(refs.sentinel);
  newsApiService.resetPage();
  deleteRender();
}

function arrfetchImages() {
  newsApiService
    .fetchImages()
    .then(response => {
      const arrImages = response.data.hits;
      newsApiService.incrementPage();

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        observer.unobserve(refs.sentinel);
        return;
      }

      if (arrImages.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      return arrImages;
    })
    .then(images => {
      appendArticlesMarkup(images);
    })
    .catch(error => console.log(error));
}

function appendArticlesMarkup(images) {
  const countryMarkup = renderImageGallery(images);
  refs.galleryImage.insertAdjacentHTML('beforeend', countryMarkup);
  new SimpleLightbox('.gallery a').refresh();
}

function deleteRender() {
  refs.galleryImage.innerHTML = '';
}
