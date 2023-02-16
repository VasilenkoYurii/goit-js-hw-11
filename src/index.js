import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import NewsApiService from './js/fetchImages';
import LoadMoreBtn from './js/components/loadMoreBtn';
import renderImageGallery from './js/components/renderImageGallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryImage: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  body: document.querySelector('body'),
};

// refs.body.addEventListener('click', e => {
//   // e.preventDefault();
//   console.log(e);
//   if (e.target.nodeName === 'IMG') {
//     e.preventDefault();
//   }
// });

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', userSearchImages);
refs.loadMoreBtn.addEventListener('click', arrfetchImages);

function userSearchImages(e) {
  e.preventDefault();

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

  newsApiService.resetPage();
  deleteRender();
  arrfetchImages();
}

function arrfetchImages() {
  loadMoreBtn.disable();
  newsApiService
    .fetchImages()
    .then(response => {
      const arrImages = response.data.hits;
      newsApiService.incrementPage();

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.hide();
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
      loadMoreBtn.enable();
    })
    .catch(error => console.log(error));
}

function appendArticlesMarkup(images) {
  const countryMarkup = renderImageGallery(images);
  refs.galleryImage.insertAdjacentHTML('beforeend', countryMarkup);
  loadMoreBtn.show();
}

function deleteRender() {
  refs.galleryImage.innerHTML = '';
}

SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
