import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import NewsApiService from './js/fetchImages';
// import LoadMoreBtn from './js/components/loadMoreBtn';
import renderImageGallery from './js/components/renderImageGallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryImage: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  sentinel: document.querySelector('#sentinel'),
};

const newsApiService = new NewsApiService();

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
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });

refs.searchForm.addEventListener('submit', userSearchImages);

// refs.loadMoreBtn.addEventListener('click', arrfetchImages);

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
  // arrfetchImages();
}

function arrfetchImages() {
  // loadMoreBtn.disable();
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
        // loadMoreBtn.hide();
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
      // loadMoreBtn.enable();
    })
    .catch(error => console.log(error));
}

function appendArticlesMarkup(images) {
  const countryMarkup = renderImageGallery(images);
  refs.galleryImage.insertAdjacentHTML('beforeend', countryMarkup);
  SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
  // loadMoreBtn.show();
}

function deleteRender() {
  refs.galleryImage.innerHTML = '';
}

// document.addEventListener('scroll', debounce(infinityScroll, 400));
// function infinityScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   newsApiService.fetchImages().then(response => {
//     if (response.data.hits.length === 0) {
//       return;
//     }
//     if (clientHeight + scrollTop + 300 >= scrollHeight) {
//       console.log('est');
//       arrfetchImages();
//     }
//   });
// }
